import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import FormCat from "./components/FormCat";
import ListCat from "./components/ListCat";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FormCat />
        <ListCat />
      </QueryClientProvider>
    </>
  );
}

export default App;
