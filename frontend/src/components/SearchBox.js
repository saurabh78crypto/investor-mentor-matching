import { useState } from "react";
import { searchQuery } from "../services/api";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [userCredits, setUserCredits] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSearch = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const res = await searchQuery({ email, query });

      if(res.status === 200) {
        setResponse(res.data.result || "No results found.");
        setErrorMessage("");
        setUserCredits(res.data.remainingCredits);
      }
      
    } catch (error) {
      console.error("Search error:", error.response);
      if(error.response && error.response.data.status === 400 && error.response.data.message){
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while searching. Please try again.");
      }
      setResponse("");
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
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
      {response && <p className="mt-2 text-lg">{response}</p>}
      {userCredits !== null && <p className="mt-2 text-gray-500">Remaining Credits: {userCredits}</p>}
    </div>
  );
};

export default SearchBox;
