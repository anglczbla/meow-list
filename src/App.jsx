import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FavoriteCat from "./components/FavoriteCat";
import FormCat from "./components/FormCat";
import ListCat from "./components/ListCat";
import Navbar from "./components/Navbar";
import CatProvider from "./context/CatContext";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CatProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<ListCat />} />
              <Route path="/addcat" element={<FormCat />} />
              <Route path="/favorite" element={<FavoriteCat />} />
            </Routes>
          </CatProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
