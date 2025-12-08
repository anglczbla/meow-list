import { useState } from "react";
import { useCatContext } from "../context/CatContext";

const FormCat = () => {
  const { addCat } = useCatContext();
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
    </div>
  );
};

export default FormCat;
