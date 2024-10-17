import { useState } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import Routing from "./routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import AuthenticationPage from "./views/AuthenticationPage";

function App() {
  const [auth] = useState<boolean>(!false);

  // <ModeToggle />
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {auth ? (
        <BrowserRouter>
          <Navbar>
            <Routing />
          </Navbar>
        </BrowserRouter>
      ) : (
        <AuthenticationPage />
      )}
    </ThemeProvider>
  );
}

export default App;
