import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import FormCat from "./components/FormCat";
import ListCat from "./components/ListCat";
import CatProvider from "./context/CatContext";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CatProvider>
          <FormCat />
          <ListCat />
        </CatProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
