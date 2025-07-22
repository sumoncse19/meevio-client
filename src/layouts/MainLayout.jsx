import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== '/dashboard' && <Navbar />}

      <main className='mt-16 min-h-[calc(100vh-482px)]'>
        <Outlet />
      </main>
      {location.pathname !== '/dashboard' && <Footer />}
    </div>
  );
};

export default MainLayout;
