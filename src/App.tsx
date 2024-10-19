import { useState } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import Routing from "./routing";
import { BrowserRouter } from "react-router-dom";
import AuthenticationPage from "./views/AuthenticationPage";

function App() {
  const [auth] = useState<boolean>(!false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {auth ? (
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      ) : (
        <AuthenticationPage />
      )}
    </ThemeProvider>
  );
}

export default App;
