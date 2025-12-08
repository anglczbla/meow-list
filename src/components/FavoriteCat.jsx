import { useCatContext } from "../context/CatContext";

const FavoriteCat = () => {
  const { favorite, removeFavorite } = useCatContext();
  console.log("isi favorite", favorite);

  return (
    <div>
      {favorite.length <= 0 ? (
        <p>no cat in favorites</p>
      ) : (
        <div>
          {favorite.map((item) => (
            <div key={item.id}>
              <p>
                <img src={item.image} width={300} />
              </p>
              <p>
                <strong>Name: </strong> {item.name}
              </p>
              <p>
                <strong>Origin: </strong> {item.origin}
              </p>
              <p>
                <strong>Description: </strong> {item.description}
              </p>
              <p>
                <strong>Temperament: </strong> {item.temperament}
              </p>
              <button onClick={() => removeFavorite(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCat;
