import { useCallback, useEffect, useState } from "react";
import { search } from "./api.ts";
import type { paths } from "../github";

/**
 * Custom hook encapsulating everything needed to maintain a view of the data (or lack thereof) from the GitHub API
 */
export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    | paths["/search/repositories"]["get"]["responses"]["200"]["content"]["application/json"]
    | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await search(query);
      setSearchResults(results);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while searching",
      );
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const execute = async () => await performSearch(searchTerm);
    execute();
    return () => {};
  }, [performSearch, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    error,
    performSearch,
  };
};
