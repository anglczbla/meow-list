import { useState } from "react";
import { useCatContext } from "../context/CatContext";

const FormCat = () => {
  const {
    addCat,
    allCats,
    isLoading,
    isError,
    cat,
    removeFavorite,
    addToFavorites,
    listCat,
    alreadyOnFavorites,
    page,
    setPage,
  } = useCatContext();
  const [formCat, setFormCat] = useState({
    name: "",
    image: null,
    origin: "",
    description: "",
    temperament: "",
  });

  const [preview, setPreview] = useState(null);
  console.log("isi preview", preview);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormCat({ ...formCat, [name]: value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormCat({ ...formCat, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitFormCat = (e) => {
    e.preventDefault();

    const newCat = {
      id: Date.now(),
      name: formCat.name,
      origin: formCat.origin,
      description: formCat.description,
      temperament: formCat.temperament,
      image: preview,
    };

    addCat(newCat);

    setFormCat({
      name: "",
      image: null,
      origin: "",
      description: "",
      temperament: "",
    });
    setPreview(null);
  };

  return (
    <div>
      <form onSubmit={submitFormCat}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formCat.name}
          placeholder="input name cat"
          onChange={handleChangeForm}
        />
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          name="image"
          placeholder="upload image cat"
          accept="image/*"
          onChange={handleFile}
        />
        {preview && <img src={preview} alt="Preview" width={200} />}
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          value={formCat.description}
          placeholder="input description cat"
          onChange={handleChangeForm}
        />
        <label htmlFor="origin">Origin:</label>
        <input
          type="text"
          name="origin"
          value={formCat.origin}
          placeholder="input description cat"
          onChange={handleChangeForm}
        />
        <label htmlFor="temperament">Temperament:</label>
        <input
          type="text"
          name="temperament"
          value={formCat.temperament}
          placeholder="input temperament cat"
          onChange={handleChangeForm}
        />
        <button type="submit">Submit</button>
      </form>

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
    </div>
  );
};

export default FormCat;
