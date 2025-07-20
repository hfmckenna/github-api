import type { GitHubSearchOptions } from "./api.types.ts";
import type { components } from "../github";

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
  if (!res.ok) {
    throw new Error("Error: " + res.status + " " + res.statusText);
  }
  return res.json();
};

/**
 * Service for getting from an authenticated URL
 * @param url - {@link URL}
 */
export const get = (url: RequestInfo | URL) => wrappedFetch(url);

/**
 * Parameterised search of GitHub repository data via their API
 * @param query
 * @param options - {@link GitHubSearchOptions} to dictate how data should be returned
 */
export const search: components["schemas"]["repo-search-result-item"] = (
  query: string,
  options = {},
) => get(URLS.SEARCH(query, options)).catch(() => false);
