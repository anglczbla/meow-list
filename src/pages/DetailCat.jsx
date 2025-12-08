import { useParams, useNavigate } from "react-router-dom";
import { useCatContext } from "../context/CatContext";
import { useEffect, useState } from "react";

const DetailCat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allCats, addToFavorites, removeFavorite, alreadyOnFavorites } = useCatContext();
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const found = allCats.find((c) => c.id == id);
    setCat(found);
  }, [id, allCats]);

  if (!cat) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mb-4"></div>
        <p className="text-slate-500">Finding your cat...</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  const isFavorite = alreadyOnFavorites(cat.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-slate-600 hover:text-blue-600 transition group"
      >
        <span className="mr-2 text-xl group-hover:-translate-x-1 transition-transform">&larr;</span> 
        Back to List
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        
        {/* Kolom Kiri: Gambar Besar (Full) */}
        <div className="md:w-1/2 bg-slate-900 relative min-h-[400px] flex items-center justify-center p-4"> {/* Added p-4 for padding */}
          {(cat.image || cat.preview) ? (
             <img 
               src={cat.image || cat.preview} 
               alt={cat.name} 
               className="max-h-full max-w-full object-contain" // Changed to object-contain
             />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg font-medium">
              No Image Available
            </div>
          )}
        </div>

        {/* Kolom Kanan: Informasi Detail */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{cat.name}</h1>
            {cat.origin && (
              <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full font-bold text-xs uppercase tracking-wider border border-blue-100">
                {cat.origin}
              </span>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Temperament</h3>
              <div className="flex flex-wrap gap-2">
                {cat.temperament ? (
                    cat.temperament.split(',').map((temp, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium">
                            {temp.trim()}
                        </span>
                    ))
                ) : (
                    <span className="text-slate-400 italic">No temperament info</span>
                )}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">About</h3>
               <p className="text-slate-700 leading-relaxed text-base">
                 {cat.description || "No description provided for this cat."}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <span className="block text-xs text-slate-400 font-bold uppercase">Life Span</span>
                    <span className="block text-lg font-bold text-slate-800 mt-1">{cat.life_span || "?"} years</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <span className="block text-xs text-slate-400 font-bold uppercase">Weight</span>
                    <span className="block text-lg font-bold text-slate-800 mt-1">{cat.weight?.metric || "?"} kg</span>
                </div>
            </div>

            {/* Button Add/Remove to Favorites */}
            <div className="pt-4 border-t border-slate-100 flex gap-3">
                {isFavorite ? (
                    <button
                        onClick={() => removeFavorite(cat.id)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg text-base font-semibold transition shadow-md"
                    >
                        ★ Remove from Favorites
                    </button>
                ) : (
                    <button
                        onClick={() => addToFavorites(cat)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-semibold transition shadow-md"
                    >
                        ☆ Add to Favorites
                    </button>
                )}
                {cat.wikipedia_url && (
                    <a 
                      href={cat.wikipedia_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-3 bg-slate-100 text-blue-600 hover:bg-slate-200 rounded-lg font-semibold transition shadow-md"
                    >
                      Wiki <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCat;