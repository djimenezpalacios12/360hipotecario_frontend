import { Routes, Route, Navigate } from "react-router-dom";

import AuthenticationPage from "@/views/AuthenticationPage";
import Simulator from "@/views/simulator";
import Navbar from "@/components/navbar/navbar";

// Routing
const Routing = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AuthenticationPage />
            </>
          }
        />

        <Route
          path="/simulator"
          element={
            <>
              <Navbar>
                <Simulator />
              </Navbar>
            </>
          }
        />

        {/* redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Routing;
