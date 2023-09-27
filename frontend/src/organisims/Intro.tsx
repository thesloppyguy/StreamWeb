import React from "react";
// import { Button } from "../atoms";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="my-20 justify-between">
      <div className="text-center my-10">
        <h1>The easiest way to live stream and record</h1>
      </div>
      <div className="text-center ">
        <p>
          A professional live streaming and recording studio in your browser.
          Record your content, or stream live to Facebook, YouTube, and other
          platforms.
        </p>
      </div>
      <div className="text-center my-10">
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          {" "}
          test
        </button>
        <a href="/signup">Get Started - it's free</a>
      </div>
    </div>
  );
};

export default Intro;
