import React from "react";
import { Header, FormField } from "../molecules";
import { useState } from "react";
import { INotification } from "../interfaces/Notification";
import { Notification } from "../molecules/Notification";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [notification, setNotification] = useState<INotification>({
    message: "",
    open: false,
    type: "error",
  });

  const headerProps = {
    heading: "Create your account",
    question: "Already using StreamWeb?",
    answer: "Log in.",
    lnk: "/login",
  };
  const navigate = useNavigate();
  const [formUsername, setFormUsername] = useState();
  const [formEmail, setFormEmail] = useState();
  const [formPassword, setFormPassword] = useState();
  const [formRepassword, setFormRepassword] = useState();
  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      return false;
    }

    if (!/[a-z]/.test(password)) {
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      return false;
    }

    if (!/\d/.test(password)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!validatePassword(formPassword!)) {
      console.log(formPassword);
      setNotification({
        message: "Provide a Stronger Password.",
        open: true,
        type: "error",
      });
    } else if (formPassword !== formRepassword) {
      setNotification({
        message: "Password Missmatch. Please Check",
        open: true,
        type: "error",
      });
    } else {
      axios
        .post("http://localhost:5555/api/users/signup", {
          name: formUsername,
          email: formEmail,
          password: formPassword,
        })
        .then((resp) => {
          console.log(resp);
          setNotification({
            message: "You have successfully registered!",
            open: true,
            type: "success",
          });
          setLoading(false);
          navigate("/login");
        })
        .catch((resp) => {
          console.log(resp);
          setNotification({
            message: resp,
            open: true,
            type: "error",
          });
        });
    }
    setLoading(false);
  };

  return (
    <div className="text-center bg-white w-[100%] max-w-[500px] border-2 border-white rounded-[10px] mx-auto shadow-md p-10">
      <Notification {...notification} setOpen={setNotification} />
      <div className="text-black py-5">
        <Header {...headerProps} />
      </div>
      <div className="text-black">
        <form onSubmit={handleSubmit}>
          <FormField
            label=""
            name="username"
            type="text"
            onChange={(e: any) => setFormUsername(e.target.value)}
            placeholder="Username"
          />
          <FormField
            label=""
            name="email"
            type="email"
            onChange={(e: any) => setFormEmail(e.target.value)}
            placeholder="Email"
          />
          <FormField
            label=""
            name="password"
            type="password"
            onChange={(e: any) => setFormPassword(e.target.value)}
            placeholder="Password"
          />
          <FormField
            label=""
            name="repassword"
            type="password"
            onChange={(e: any) => setFormRepassword(e.target.value)}
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-[40px] w-[56%] rounded-md bg-[#a5c4f6] text-[20px]"
          >
            Sign-up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
