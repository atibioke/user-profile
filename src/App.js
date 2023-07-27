import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import UserDetails from "./component/Container";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient} className="bg-gray-200 h-[1800px] lg:h-[1050px]">
      <UserDetails />
    </QueryClientProvider>
  )
}

export default App;
