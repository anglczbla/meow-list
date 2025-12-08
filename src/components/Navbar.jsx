import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <Link to="/">Cat</Link>
      <Link to="/addcat">Add New Cat</Link>
      <Link to="/favorite">Favorite</Link>
    </div>
  );
};

export default Navbar;
