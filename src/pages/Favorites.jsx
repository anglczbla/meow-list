import ListCat from "../components/ListCat";
import { useCatContext } from "../context/CatContext";

const Favorites = () => {
  const { favorite } = useCatContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Favorites</h1>
          <p className="text-slate-500 mt-1">
            A collection of your most loved cats.
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold">
          {favorite.length} Cats Saved
        </div>
      </div>

      {favorite.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm text-center">
          <div className="text-6xl mb-4">😿</div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">
            No favorites yet
          </h3>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            You haven't added any cats to your favorites list. Go explore and
            find some cute ones!
          </p>
          <a
            href="/"
            className="px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition"
          >
            Explore Cats
          </a>
        </div>
      ) : (
        <ListCat cats={favorite} showPagination={false} />
      )}
    </div>
  );
};

export default Favorites;
