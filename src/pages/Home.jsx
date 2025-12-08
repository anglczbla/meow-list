import { useState } from "react";
import ListCat from "../components/ListCat";
import { useCatContext } from "../context/CatContext";

const Home = () => {
  const { allCats, isLoading, isError } = useCatContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCats = allCats.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.temperament.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-800">Explore Cats</h1>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search cats by name, origin, or temperament..."
            className="w-full md:w-100 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-500 mt-4">Loading cats...</p>
        </div>
      )}

      {isError && (
        <div className="text-center py-12 text-rose-500">
          Error loading cats. Please try again later.
        </div>
      )}

      {!isLoading && !isError && (
        <ListCat cats={filteredCats} showPagination={true} />
      )}

      {!isLoading && !isError && filteredCats.length === 0 && searchTerm && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 shadow-sm">
          <p className="text-lg text-slate-500">
            No cats found matching "{searchTerm}".
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
