import { QueryClientProvider } from "@tanstack/react-query";
import { Account } from "./Account/Account";
import { queryClient } from "./api/queryClient";
import "./App.css";
import { PageSelector } from "./components/PageSelector";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Account />
        {/* <PageSelector/> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
