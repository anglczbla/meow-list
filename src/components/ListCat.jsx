import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCatContext } from "../context/CatContext";

const ListCat = ({ cats, showPagination = false }) => {
  const {
    isLoading,
    isError,
    cat: apiData,
    listCat,
    deleteCat,
    addToFavorites,
    alreadyOnFavorites,
    removeFavorite,
    setPage,
    page,
    deletes,
    setDeletes,
    setListCat,
    allCats,
  } = useCatContext();

  const navigate = useNavigate();

  const [editingId, setEditingId] = useState(null);
  const [editCat, setEditCat] = useState({});
  const [previewEdit, setPreviewEdit] = useState(null);

  const handleDelete = (e, catId, isLocal) => {
    e.stopPropagation();
    if (isLocal) {
      deleteCat(catId);
    } else {
      setDeletes([...deletes, catId]);
    }
  };

  const toggleEdit = (e, item) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditCat(item);
    setPreviewEdit(item.image || item.preview || null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCat({ ...editCat, [name]: value });
  };

  const handleEditFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setEditCat({ ...editCat, image: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewEdit(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveEdit = (e) => {
    e.stopPropagation();
    const updatedList = listCat.map((c) =>
      c.id === editCat.id
        ? { ...c, ...editCat, image: previewEdit || c.image }
        : c
    );
    setListCat(updatedList);
    setEditingId(null);
    setPreviewEdit(null);
  };

  // ------------------------------------------------------------------

  return (
    <div>
      {isLoading && (
        <p className="text-center text-slate-500 py-8">Loading...</p>
      )}
      {isError && (
        <p className="text-center text-rose-500 py-8">Error loading cats</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cats.map((item) => {
          const isLocal = listCat.some((cat) => cat.id === item.id);
          const isEditing = editingId === item.id;

          if (isEditing) {
            return (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-lg border-2 border-blue-500 flex flex-col gap-3"
              >
                <h3 className="font-bold text-blue-600 text-center">
                  Edit Cat
                </h3>

                <input
                  name="name"
                  value={editCat.name}
                  onChange={handleEditChange}
                  className="border border-slate-300 p-2 rounded text-sm w-full"
                  placeholder="Name"
                />

                <div className="flex items-center gap-2">
                  {previewEdit && (
                    <img
                      src={previewEdit}
                      className="w-12 h-12 object-cover rounded border"
                    />
                  )}
                  <input
                    type="file"
                    onChange={handleEditFile}
                    className="text-xs text-slate-500"
                  />
                </div>

                <input
                  name="origin"
                  value={editCat.origin}
                  onChange={handleEditChange}
                  className="border border-slate-300 p-2 rounded text-sm w-full"
                  placeholder="Origin"
                />

                <input
                  name="temperament"
                  value={editCat.temperament}
                  onChange={handleEditChange}
                  className="border border-slate-300 p-2 rounded text-sm w-full"
                  placeholder="Temperament"
                />

                <textarea
                  name="description"
                  value={editCat.description}
                  onChange={handleEditChange}
                  className="border border-slate-300 p-2 rounded text-sm w-full min-h-[60px]"
                  placeholder="Desc"
                />

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={saveEdit}
                    className="flex-1 bg-blue-600 text-white py-1 rounded text-sm font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(null);
                    }}
                    className="flex-1 bg-slate-200 text-slate-700 py-1 rounded text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          }

          // TAMPILAN KARTU NORMAL
          return (
            <div
              key={item.id}
              onClick={() => navigate(`/cat/${item.id}`)}
              className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-60 bg-slate-100 overflow-hidden">
                {item.image || item.preview ? (
                  <img
                    src={item.image || item.preview}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No Image
                  </div>
                )}
                {isLocal && (
                  <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    Local
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">
                  {item.name}
                </h3>

                <div className="space-y-1 text-sm text-slate-600 mb-4">
                  <p>
                    <span className="font-semibold text-slate-900">
                      Origin:
                    </span>{" "}
                    {item.origin || "-"}
                  </p>
                  <p className="line-clamp-1">
                    <span className="font-semibold text-slate-900">Temp:</span>{" "}
                    {item.temperament || "-"}
                  </p>
                </div>

                <div className="mt-auto flex gap-2 border-t border-slate-50 pt-4">
                  <button
                    onClick={(e) => handleDelete(e, item.id, isLocal)}
                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Delete
                  </button>

                  {alreadyOnFavorites(item.id) ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(item.id);
                      }}
                      className="flex-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Unfav
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToFavorites(item);
                      }}
                      className="flex-1 bg-slate-100 text-slate-600 hover:bg-slate-200 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Fav
                    </button>
                  )}

                  {isLocal && (
                    <button
                      onClick={(e) => toggleEdit(e, item)}
                      className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {showPagination && apiData?.totalPages > 0 && (
        <div className="flex justify-center flex-wrap gap-2 mt-10">
          {[...Array(apiData.totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition ${
                page === index + 1
                  ? "bg-slate-800 text-white shadow-lg"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListCat;
