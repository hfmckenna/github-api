import type { paths } from "../github";
import {
  Box,
  Button,
  Chip,
  Link,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";

interface SearchResultProps {
  item: paths["/search/repositories"]["get"]["responses"]["200"]["content"]["application/json"]["items"][number];
  fetchReadme: (fullName: string, id: number) => void;
  readmeContent: { [key: number]: string };
  loadingReadme: { [key: number]: boolean };
}

/**
 * Main app component displaying details of the repository and offering a view of the respository README
 * @param item
 * @param fetchReadme
 * @param readmeContent
 * @param loadingReadme
 * @constructor
 */
function SearchResult({
  item,
  fetchReadme,
  readmeContent,
  loadingReadme,
}: SearchResultProps) {
  return (
    <ListItem sx={{ mb: 2 }}>
      <Paper sx={{ p: 2, width: "100%" }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Chip label={`Forks: ${item.forks_count}`} size="small" />
          <Chip label={`Stars: ${item.stargazers_count}`} size="small" />
          <Chip label={`Issues: ${item.open_issues_count}`} size="small" />
        </Box>

        <Typography variant="h6" gutterBottom>
          <Link
            href={item.url.replace("api", "www").replace("repos/", "")}
            target="_blank"
            rel="noopener"
          >
            {item.name}
          </Link>
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Owner:{" "}
          <Link
            href={item.owner?.url.replace("api", "www").replace("users/", "")}
            target="_blank"
            rel="noopener"
          >
            {item.owner?.id}
          </Link>
        </Typography>

        <Button
          variant="outlined"
          onClick={() => fetchReadme(item.full_name, item.id)}
          disabled={loadingReadme[item.id]}
          sx={{ mt: 1 }}
        >
          {loadingReadme[item.id]
            ? "Loading..."
            : readmeContent[item.id]
              ? "Hide README"
              : "Show README"}
        </Button>

        {readmeContent[item.id] && (
          <Paper sx={{ mt: 2, p: 2, bgcolor: "grey.50" }}>
            <Typography
              component="pre"
              variant="body2"
              sx={{ whiteSpace: "pre-wrap" }}
            >
              <div
                // Security implications understood, treating GitHub UGC as if it were trusted content for test purposes
                dangerouslySetInnerHTML={{ __html: readmeContent[item.id] }}
              ></div>
            </Typography>
          </Paper>
        )}
      </Paper>
    </ListItem>
  );
}

export default SearchResult;
