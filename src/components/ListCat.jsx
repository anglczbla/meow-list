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
        <div key={item.id}>
          <img src={item.image} alt={item.name} width={300} />
          <p>
            <strong>Name:</strong> {item.name}
          </p>
          <p>
            <strong>Origin:</strong> {item.origin}
          </p>
        </div>
      ))}

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
