import { useState } from "react";
import { searchQuery } from "../services/api";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSearch = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const res = await searchQuery({ email, query });
      
      setResponse(res.data.result);
    } catch (error) {
      console.error("Search error:", error);
      setResponse("No results found.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded w-96"
        placeholder="Type your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 mt-2 rounded" onClick={handleSearch}>
        Search
      </button>
      {response && <p className="mt-2 text-lg">{response}</p>}
    </div>
  );
};

export default SearchBox;
