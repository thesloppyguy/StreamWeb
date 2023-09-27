import React from "react";

interface ButtonProps {}

export const Button = (text: string) => {
  return <button className="bg-blue-700"> ${text} </button>;
};
