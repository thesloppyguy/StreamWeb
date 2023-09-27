import React from "react";
import { Link } from "react-router-dom";

interface HeaderInterface {
  heading: string;
  question: string;
  answer: string;
  lnk: string;
}

const Header = ({ heading, question, answer, lnk }: HeaderInterface) => {
  return (
    <div>
      <h1>{heading}</h1>
      <br />
      <p>
        {question}{" "}
        <Link to={lnk} className="text-blue-500">
          {answer}
        </Link>
      </p>
    </div>
  );
};

export default Header;
