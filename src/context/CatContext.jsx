import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useState } from "react";

export const CatContext = createContext();
const CatProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [listCat, setListCat] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [deletes, setDeletes] = useState([]);

  const {
    data: cat,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cat", page, limit],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.freeapi.app/api/v1/public/cats?page=${page}&limit=${limit}`
      );
      return response.data.data;
    },
  });

  const filteredCats =
    cat?.data?.filter((item) => !deletes.includes(item.id)) || [];

  const allCats = [...listCat, ...filteredCats];

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
    return isExist;
  };

  const removeFavorite = (id) => {
    setFavorite(favorite.filter((cat) => cat.id !== id));
  };

  const value = {
    addCat,
    deleteCat,
    listCat,
    addToFavorites,
    alreadyOnFavorites,
    removeFavorite,
    allCats,
    cat,
    isLoading,
    isError,
    deletes,
    page,
    limit,
    setPage,
    setLimit,
    setDeletes,
    favorite,
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
