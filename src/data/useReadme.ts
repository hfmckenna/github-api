import { useState } from "react";
import { readme } from "./api.ts";

/**
 * State for hiding and displaying a specific GitHub repos Readme
 */
export const useReadme = () => {
  const [readmeContent, setReadmeContent] = useState<{ [key: number]: string }>(
    {},
  );
  const [loadingReadme, setLoadingReadme] = useState<{
    [key: number]: boolean;
  }>({});
  const fetchReadme = async (repoFullName: string, repoId: number) => {
    if (readmeContent[repoId]) {
      setReadmeContent((prev) => ({ ...prev, [repoId]: "" }));
      return;
    }
    setLoadingReadme((prev) => ({ ...prev, [repoId]: true }));
    try {
      const response = await readme(repoFullName);
      setReadmeContent((prev) => ({ ...prev, [repoId]: response }));
    } finally {
      setLoadingReadme((prev) => ({ ...prev, [repoId]: false }));
    }
  };
  return {
    fetchReadme,
    readmeContent,
    loadingReadme,
  };
};
