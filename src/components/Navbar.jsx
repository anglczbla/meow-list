import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? "text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg" 
      : "text-slate-600 hover:text-blue-600 px-3 py-1 rounded-lg hover:bg-slate-50 transition";
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold text-slate-800 flex items-center gap-2 tracking-tight">
          <span className="text-2xl">🐱</span> MeowList
        </Link>
        <div className="flex gap-2">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/add" className={isActive("/add")}>
            Add Cat
          </Link>
          <Link to="/favorites" className={isActive("/favorites")}>
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;