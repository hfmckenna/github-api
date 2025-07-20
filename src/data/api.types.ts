/**
 * Optional query parameters that can be used with various search requests on the GitHub API
 * @see https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories
 */
export type  GitHubSearchOptions = {
    sort?: string;
    order?: string;
    results?: number;
    page?: number;
}
