import React from "react";
import {
  Navbar,
  Intro,
  Video,
  Pricing,
  Partners,
  About,
  Footer,
} from "../organisims";
import { Signup, Login } from "../templates";

const Landing = () => {
  return (
    <div className="mx-20">
      <Navbar />
      <Intro />
      <Video />
      <Pricing />
      <Partners />
      <About />
      <Footer />
    </div>
  );
};

export default Landing;
