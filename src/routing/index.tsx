import { Routes, Route, Navigate } from "react-router-dom";

import AuthenticationPage from "@/views/AuthenticationPage";
import Simulator from "@/views/simulator";

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
              <Simulator />
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
