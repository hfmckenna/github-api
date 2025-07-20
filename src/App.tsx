import "./App.css";
import { useSearch } from "./data/useSearch.ts";
import { useReadme } from "./data/useReadme.ts";

function App() {
  const { searchTerm, setSearchTerm, searchResults } = useSearch();
  const { fetchReadme, readmeContent, loadingReadme } = useReadme();
  return (
    <>
      <div className="card">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {searchResults?.items!.map((item) => (
          <li key={item.id} className="card">
            <div>{item.forks_count}</div>
            <div>{item.stargazers_count}</div>
            <div>{item.open_issues_count}</div>
            <a href={item.url.replace("api", "www").replace("repos/", "")}>
              {item.name}
            </a>
            <a
              href={item.owner?.url.replace("api", "www").replace("users/", "")}
            >
              {item.owner?.id}
            </a>
            <button
              onClick={() => fetchReadme(item.full_name, item.id)}
              disabled={loadingReadme[item.id]}
            >
              {loadingReadme[item.id]
                ? "Loading..."
                : readmeContent[item.id]
                  ? "Hide README"
                  : "Show README"}
            </button>
            {readmeContent[item.id] && <pre>{readmeContent[item.id]}</pre>}
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
