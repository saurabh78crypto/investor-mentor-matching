import { useState } from "react";
import { searchQuery } from "../services/api";
import { getEmail } from "../utils/searchUtils";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [userCredits, setUserCredits] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSearch = async () => {
    try {
      const email = getEmail();
      const data = await searchQuery({ email, query });
      renderData(data);
    } catch (error) {
        setErrorMessage(error.message);
  };

  const renderData = (data) => {
    setResponse(data);
    setUserCredits(data.userCredits);
  }
  }


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
