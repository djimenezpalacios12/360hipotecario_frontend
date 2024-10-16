import { HandCoins } from "lucide-react";

import Login from "./login";
import "./styles.css";

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-lvh min-w-full flex-col items-center justify-center md:grid lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 container-background" />
          <div className="relative z-20 flex items-center text-lg">
            <HandCoins className="mr-2" />
            360 Hipotecario
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;Saber dónde encontrar la información y cómo usarla. Ese es el secreto del éxito.&rdquo;</p>
              <footer className="text-sm">Albert Einstein</footer>
            </blockquote>
          </div>
        </div>

        <div className="px-10 w-full">
          <div className="mx-auto h-lvh flex w-full flex-col justify-center align-middle space-y-6">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
