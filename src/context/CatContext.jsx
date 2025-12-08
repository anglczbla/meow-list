import { createContext, useContext, useState } from "react";

export const CatContext = createContext();
const CatProvider = ({ children }) => {
  const [listCat, setListCat] = useState([]);
  const [favorite, setFavorite] = useState([]);
  console.log("isi favorite", favorite);

  const addCat = (cat) => {
    setListCat([...listCat, cat]);
  };

  const deleteCat = (catId) => {
    setListCat(listCat.filter((cat) => cat.id !== catId));
  };

  const addToFavorites = (item) => {
    setFavorite([...favorite, item]);
  };

  const alreadyOnFavorites = (id) => {
    const isExist = favorite.some((cat) => cat.id == id);
    console.log("isi isexist", isExist);

    if (isExist) {
      return isExist;
    }
  };

  const removeFavorite = (id) => {
    setListCat(listCat.filter((cat) => cat.id !== id));
  };

  const value = {
    addCat,
    deleteCat,
    listCat,
    addToFavorites,
    alreadyOnFavorites,
    removeFavorite,
  };

  return (
    <div>
      <CatContext.Provider value={value}>{children}</CatContext.Provider>
    </div>
  );
};

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new error("use context must be used within cat provider");
  }
  return context;
};

export default CatProvider;
