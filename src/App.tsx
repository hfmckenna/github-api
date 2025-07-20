import { Box, List, Paper, TextField } from "@mui/material";
import { useSearch } from "./data/useSearch.ts";
import { useReadme } from "./data/useReadme.ts";
import SearchResult from "./components/SearchResult.tsx";

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
          <SearchResult
            item={item}
            loadingReadme={loadingReadme}
            fetchReadme={fetchReadme}
            readmeContent={readmeContent}
          />
        ))}
      </List>
    </Box>
  );
}

export default App;
