import { useState, useEffect } from "react";
import { MdOutlineKey } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import loginVector from "../assets/LoginPage.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchAuth = async () => {
      const auth = await checkAuth();
      console.log(auth);
      setUser(auth);
      if (auth._id) navigate("/");
    };

    fetchAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullname) {
      toast.error("Please fill all the fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    const response = await signup(fullname, email, password);
    console.log(response);
    if (response) {
      toast.success("Account created successfully");
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
              <h1 className="text-3xl font-bold text-center text-gray-200">
                Create Account
              </h1>
              <h1 className="text-lg text-center text-gray-400 mb-4">
                Sign up to your account
              </h1>
            </div>
          </div>
          <form>
            <div className="mb-6 min-w-xs">
              <label className="input">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-6 min-w-xs">
              <label className="input validator">
                <IoMail className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <div className="mb-7 min-w-xs">
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
            <div className="mb-4 min-w-xs flex justify-center">
              <button
                type="submit"
                className="btn btn-primary min-w-xs"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
            <div className="mb-4 min-w-xs flex justify-center mt-3">
              Already have an account?&nbsp;
              <Link className="text-primary cursor-pointer" to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img src={loginVector} className="w-150 h-150" />
      </div>
    </div>
  );
};

export default Signup;
