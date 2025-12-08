import { useCatContext } from "../context/CatContext";

const ListCat = () => {
  const {
    listCat,
    addToFavorites,
    alreadyOnFavorites,
    removeFavorite,
    allCats,
    cat,
    isLoading,
    isError,
    page,
    setPage,
    handleDelete,
  } = useCatContext();

  return (
    <div>
      <h2>Cat List</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading cats</p>}

      {allCats.map((item) => {
        const isLocal = listCat.some((cat) => cat.id === item.id);
        console.log("isi islocal", isLocal);

        return (
          <div
            key={item.id}
            style={{
              border: "1px solid white",
              padding: "10px",
              margin: "10px",
            }}
          >
            {(item.image || item.preview) && (
              <img
                src={item.image || item.preview}
                alt={item.name}
                width={300}
              />
            )}
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Origin:</strong> {item.origin}
            </p>
            <p>
              <strong>Description:</strong> {item.description}
            </p>
            <p>
              <strong>Temperament:</strong> {item.temperament}
            </p>
            {isLocal && <span style={{ color: "green" }}>(Local Cat)</span>}
            <br />
            <button onClick={() => handleDelete(item.id, isLocal)}>
              Delete
            </button>
            {alreadyOnFavorites(item.id) ? (
              <button onClick={() => removeFavorite(item.id)}>Remove</button>
            ) : (
              <button onClick={() => addToFavorites(item)}>
                Add To Favories
              </button>
            )}
          </div>
        );
      })}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {[...Array(cat?.totalPages || 0)].map((_, index) => (
          <button
            key={index}
            style={{
              color: page === index + 1 ? "red" : "white",
              backgroundColor: page === index + 1 ? "white" : "black",
              padding: "10px 15px",
              cursor: "pointer",
              border: "1px solid white",
            }}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListCat;
