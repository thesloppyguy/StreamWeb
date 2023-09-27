import { Header, FormField } from "../molecules";
import { useState } from "react";
import { INotification } from "../interfaces/Notification";
import { Notification } from "../molecules/Notification";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [notification, setNotification] = useState<INotification>({
    message: "",
    open: false,
    type: "error",
  });

  const headerProps = {
    heading: "Log in to your account",
    question: "New to StreamWeb?",
    answer: "Create an account.",
    lnk: "/signup",
  };
  const navigate = useNavigate();
  const [formEmail, setFormEmail] = useState();
  const [formPassword, setFormPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5555/api/users/login", {
        email: formEmail,
        password: formPassword,
      })
      .then((resp) => {
        console.log(resp);
        setNotification({
          message: "You have successfully Logged In!",
          open: true,
          type: "success",
        });
        setLoading(false);
        navigate("/dashboard/" + resp.data._id);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.Error,
          open: true,
          type: "error",
        });
      });
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
          <button
            type="submit"
            disabled={loading}
            className="h-[40px] w-[56%] rounded-md bg-[#a5c4f6] text-[20px]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
