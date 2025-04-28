import { useState, useEffect } from "react";
import { MdOutlineKey } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import loginVector from "../assets/LoginPage.png";
import toast from "react-hot-toast";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/api";
import {ReactTyped} from 'react-typed'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchAuth = async () => {
      const auth = await checkAuth();
      console.log(auth);
      setUser(auth);
      if (auth._id){
        if(auth.isAdmin) navigate("/admin");
        else navigate("/");
      }
    };

    fetchAuth();
  }, []);

  const handleSubmit = async (e) => {
    const isAdmin = true;

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    e.preventDefault();
    const response = await login(email, password);
    console.log(response);
    if (response) {
      toast.success("Logged in successfully");
      navigate("/");
      return;
    }

    toast.error("Something went wrong");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-72px)]">
      <div className="flex justify-center items-center">
        <div className="p-15 rounded-3xl shadow-2xl flex flex-col border-1 border-gray-800 justify-center items-center">
          <div className="mb-5 min-w-xs">
            <div>
              <h1 className="text-2xl font-bold text-center">
                Welcome Back
              </h1>
              <h1 className="text-md text-center mb-4">
                Login to your account
              </h1>
            </div>
          </div>
          <form>
            <div className="mb-6 min-w-xs">
              <label className="input">
                <IoMail className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-5 min-w-xs">
              <label className="input">
                <MdOutlineKey className="text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mb-7 min-w-xs">
              <div className="text-left text-sm  cursor-pointer">
                Reset password!
              </div>
            </div>
            <div className="mb-4 min-w-xs flex justify-center">
              <button
                type="submit"
                className="btn btn-primary min-w-xs"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
            {/* <div className="mb-4 min-w-xs flex justify-center mt-3">
              Dont have an account?&nbsp;
              <Link className="text-primary cursor-pointer" to={"/signup"}>
                Signup
              </Link>
            </div> */}
          </form>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mb-20">
        <img src={loginVector} className="w-150 h-150" />
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-3xl font-bold">Secure Your&nbsp;</h1>
          <ReactTyped
            strings={["Documents", "Reports", "Images"]}
            typeSpeed={40}
            backSpeed={50}
            className="text-3xl font-bold text-primary"
            loop
          />
          {/* <h1 className="text-3xl font-bold"> with ease</h1> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
