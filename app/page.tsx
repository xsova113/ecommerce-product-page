import React from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./section/HeroSection";
import { StateContext } from "./context/StateContext";

const Home = () => {
  return (
    <StateContext>
      <div>
        <NavBar />
        <HeroSection />
      </div>
    </StateContext>
  );
};

export default Home;
