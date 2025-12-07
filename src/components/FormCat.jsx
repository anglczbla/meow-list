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

  return (
    <div>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formCat.name}
          placeholder="input name cat"
        />
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          name="image"
          value={formCat.image}
          placeholder="upload image cat"
          accept="image/*"
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          value={formCat.origin}
          placeholder="input origin cat"
        />
        <label htmlFor="origin">Origin:</label>
        <textarea
          type="text"
          name="name"
          value={formCat.origin}
          placeholder="input description cat"
        />
        <label htmlFor="temperament">Temperament:</label>
        <input
          type="text"
          name="temperament"
          value={formCat.temperament}
          placeholder="input temperament cat"
        />
      </form>
    </div>
  );
};

export default FormCat;
