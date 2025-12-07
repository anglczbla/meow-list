import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ListCat from "./components/ListCat";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ListCat />
      </QueryClientProvider>
    </>
  );
}

export default App;
