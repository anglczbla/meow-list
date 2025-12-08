import { useState } from "react";

const FormCat = () => {
  const [formCat, setFormCat] = useState({
    name: "",
    image: null,
    origin: "",
    description: "",
    temperament: "",
  });
  const [listCat, setListCat] = useState([]);
  console.log("isi list cat", listCat);

  const [preview, setPreview] = useState(null);
  console.log("isi preview", preview);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormCat({ ...formCat, [name]: value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
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
      name: formCat.name,
      origin: formCat.origin,
      description: formCat.description,
      temperament: formCat.temperament,
      preview: preview,
    };

    setListCat([...listCat, newCat]);

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
        <h2>List Cats</h2>
        {listCat.map((cat, index) => (
          <div
            key={index}
            style={{
              border: "1px solid white",
              padding: "10px",
              margin: "10px",
            }}
          >
            {cat.preview && (
              <img src={cat.preview} alt={cat.name} width={300} />
            )}
            <p>
              <strong>Name:</strong> {cat.name}
            </p>
            <p>
              <strong>Origin:</strong> {cat.origin}
            </p>
            <p>
              <strong>Description:</strong> {cat.description}
            </p>
            <p>
              <strong>Temperament:</strong> {cat.temperament}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormCat;
