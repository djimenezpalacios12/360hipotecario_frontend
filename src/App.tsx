// import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import Routing from "./routing";
import "./App.css";
// import AuthenticationPage from "./views/AuthenticationPage";

function App() {
  // const [auth] = useState<boolean>(!false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* {auth ? (
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      ) : (
        <AuthenticationPage />
      )} */}
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
