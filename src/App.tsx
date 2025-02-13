import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const Countries = lazy(() => import("./pages/countries"));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="*" element={<Countries />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
