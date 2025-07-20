import type { GitHubSearchOptions } from "./api.types.ts";
import type { paths } from "../github";
import { marked } from "marked";

/**
 * API endpoint URLs for GitHub Rest API, either static or constructed with parameters
 */
const URLS = {
  SEARCH: (
    query: string,
    {
      sort = "stars",
      order = "desc",
      results = 30,
      page = 1,
    }: GitHubSearchOptions,
  ) =>
    `https://api.github.com/search/repositories?q=${query}&sort=${sort}&order=${order}&per_page=${results}&page=${page}`,
  README: (repoFullName: string) =>
    `https://api.github.com/repos/${repoFullName}/readme`,
};

/**
 * Extensible wrapper on fetch for endpoints with bearer authentication
 * @param input - {@link RequestInfo} {@link URL}
 * @param init - {@link RequestInit}
 */
const wrappedFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, {
    ...init,
    headers: { authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` },
  });
  switch (res.status) {
    case 304:
      throw new Error("Not modified");
    case 404:
      throw new Error("Not found");
    case 422:
      throw new Error("Validation error");
    case 503:
      throw new Error("Service unavailable");
  }
  if (!res.ok) {
    throw new Error("Error: " + res.status + " " + res.statusText);
  }
  // @ts-ignore
  if ((init?.headers["Accept"] as unknown as string).includes("json")) {
    return res.json();
  }
  return res.text();
};

/**
 * Service for getting from an authenticated URL
 * @param url - {@link URL}
 * @param init
 */
export const get = (url: RequestInfo | URL, init?: RequestInit) =>
  wrappedFetch(url, init);

/**
 * Parameterised search of GitHub repository data via their API
 * @param query
 * @param options - {@link GitHubSearchOptions} to dictate how data should be returned
 */
export const search = (query: string, options = {}) =>
  get(URLS.SEARCH(query, options), {
    headers: { Accept: "application/json" },
  }).catch((err) => console.error(err.message)) as Promise<
    paths["/search/repositories"]["get"]["responses"]["200"]["content"]["application/json"]
  >;

/**
 * Parameterised search of a GitHub repository README via the GitHub API
 * @param fullRepoName - Name of the repo including owner
 */
export const readme = (fullRepoName: string) =>
  get(URLS.README(fullRepoName), {
    headers: { Accept: "application/json" },
  })
    .then((res) => res.content)
    .then(atob)
    .then(marked)
    .catch((err) => console.error(err.message)) as Promise<string>;
