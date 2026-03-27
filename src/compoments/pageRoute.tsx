import React from "react";
import {Routes, Route, Router } from "react-router-dom";
import Home from "../pages/Home";
import Recipe from "../compoments/Recipe";

const PageRoute = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
  );
};

export default PageRoute;