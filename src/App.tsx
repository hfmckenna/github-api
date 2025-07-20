import "./App.css";
import { useSearch } from "./data/useSearch.ts";

function App() {
  const { searchTerm, setSearchTerm, searchResults } = useSearch();

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
            <a href={item.url}>{item.name}</a>
            <a href={item.owner?.url}>{item.owner?.name}</a>
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
