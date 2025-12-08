import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCatContext } from "../context/CatContext";

const FormCat = () => {
  const { addCat } = useCatContext();
  const navigate = useNavigate();

  const [formCat, setFormCat] = useState({
    name: "",
    image: null,
    origin: "",
    description: "",
    temperament: "",
  });

  const [preview, setPreview] = useState(null);

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

    // Reset Form
    setFormCat({
      name: "",
      image: null,
      origin: "",
      description: "",
      temperament: "",
    });
    setPreview(null);

    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-slate-100 mt-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Add New Cat
      </h2>
      <form onSubmit={submitFormCat} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formCat.name}
            onChange={handleChangeForm}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Cat Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFile}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="h-40 w-full object-contain bg-slate-50 rounded-lg border border-slate-200"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Origin
          </label>
          <input
            type="text"
            name="origin"
            value={formCat.origin}
            onChange={handleChangeForm}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Origin Country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Temperament
          </label>
          <input
            type="text"
            name="temperament"
            value={formCat.temperament}
            onChange={handleChangeForm}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. Calm, Playful"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formCat.description}
            onChange={handleChangeForm}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-[100px]"
            placeholder="Description..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg"
        >
          Submit Cat
        </button>
      </form>
    </div>
  );
};

export default FormCat;
