import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Animation from "./Pages/Animation/Animation";
import Cards from "./Pages/cards/Cards";
import Filter from "./Pages/filter/Filter";
import Footer from "./Pages/footer/Footer";
import NewsCard from "./Pages/newsCard/Newcard";
import AnidubDashboard from "./Pages/dashboard/Dashboard";
import Profil from "./Pages/profil/profil";
import Login from "./Pages/Menu/login";
import Janr from "./Pages/janr/Janr";
import AllCategory from "./Pages/janr/allCategory";

const Main = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const isProfil = location.pathname === "/profil";
  const isLogin = location.pathname === "/Login";
  const iscategory = location.pathname === "/allCategory";

  return (
    <>
      {/* Main content */}
      <Routes>
        <Route path="/dashboard" element={<AnidubDashboard />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/allCategory" element={<AllCategory />} />
        {/* Add additional routes here */}
      </Routes>

      {/* Content shown only if not on dashboard, profile, or login */}
      {!isDashboard && !isProfil && !isLogin && !iscategory && (
        <>
          <Animation />
          <Filter />
          <NewsCard />
          <Janr />
          <Cards />
          <Footer />
        </>
      )}
    </>
  );
};

export default Main;
