import { ThemeProvider } from "@/components/theme-provider";
// import { ModeToggle } from "@/components/mode-toggle";
import Routing from "./routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <BrowserRouter>
        {/* <Routing /> */}
        <Navbar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
