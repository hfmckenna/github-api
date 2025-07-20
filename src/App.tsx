import {
  Box,
  Button,
  Chip,
  Link,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSearch } from "./data/useSearch.ts";
import { useReadme } from "./data/useReadme.ts";

function App() {
  const { searchTerm, setSearchTerm, searchResults } = useSearch();
  const { fetchReadme, readmeContent, loadingReadme } = useReadme();

  return (
    <Box sx={{ maxWidth: 1280, margin: "0 auto", padding: 2 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />
      </Paper>

      <List>
        {searchResults?.items?.map((item) => (
          <ListItem key={item.id} sx={{ mb: 2 }}>
            <Paper sx={{ p: 2, width: "100%" }}>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Chip label={`Forks: ${item.forks_count}`} size="small" />
                <Chip label={`Stars: ${item.stargazers_count}`} size="small" />
                <Chip
                  label={`Issues: ${item.open_issues_count}`}
                  size="small"
                />
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
                  href={item.owner?.url
                    .replace("api", "www")
                    .replace("users/", "")}
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
                      dangerouslySetInnerHTML={{
                        __html: readmeContent[item.id],
                      }}
                    />
                  </Typography>
                </Paper>
              )}
            </Paper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default App;
