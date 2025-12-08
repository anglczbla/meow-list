import { createContext, useContext, useState } from "react";

export const CatContext = createContext();
const CatProvider = ({ children }) => {
  const [listCat, setListCat] = useState([]);

  const addCat = (cat) => {
    setListCat([...listCat, cat]);
  };

  const deleteCat = (catId) => {
    setListCat(listCat.filter((cat) => cat.id !== catId));
  };

  const value = {
    addCat,
    deleteCat,
    listCat,
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
