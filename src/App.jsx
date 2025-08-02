// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Income from "./pages/Income";
// import Home from "./pages/Home";
// import Expense from "./pages/Expense";
// import Category from "./pages/Category";
// import Filter from "./pages/Filter";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import { Toaster } from "react-hot-toast";

// const App = () => {
//   return (
//     <>
//       <Toaster />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/dashboard" element={<Home />} />
//           <Route path="/income" element={<Income />} />
//           <Route path="/expense" element={<Expense />} />
//           <Route path="/category" element={<Category />} />
//           <Route path="/filter" element={<Filter />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Income from "./pages/Income";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* ✅ Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <ProtectedRoute>
                <Expense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filter"
            element={
              <ProtectedRoute>
                <Filter />
              </ProtectedRoute>
            }
          />

          {/* 🔓 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
