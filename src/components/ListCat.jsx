import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const ListCat = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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

  console.log("isi cat", cat);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading cats</p>}
      {cat?.data?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default ListCat;
