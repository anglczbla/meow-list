import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FormCat from "./components/FormCat";
import Navbar from "./components/Navbar";
import CatProvider from "./context/CatContext";
import DetailCat from "./pages/DetailCat";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CatProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<FormCat />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cat/:id" element={<DetailCat />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CatProvider>
    </QueryClientProvider>
  );
}

export default App;
