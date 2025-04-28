import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdOutlineKey } from "react-icons/md";
import { getKeyFromFingerPrint, addDoctor } from "../utils/api";
import { Loader } from "lucide-react";
  import { toast } from "react-hot-toast";

const AddDoctor = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [biometricFile, setBiometricFile] = useState(null);
  const [biometric, setBiometric] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !password || !position || !profilePic || !biometric) {
      toast.error("Please fill in all fields");
      return;
    }

    const data = {
      fullname: fullname,
      email: email,
      password: password,
      position: position,
      profilePic: profilePic,
      biometric: biometric,
    };

    const response = await addDoctor(data);

    if(response.success){
      toast.success("Doctor added successfully");
      document.getElementById("my_modal_1").close();
      setFullName("");
      setEmail("");
      setPassword("");
      setPosition("");
      setProfilePic(null);
      setBiometric(null);
    }

    console.log(response);
  };

  const handleProfilePic = async (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      console.log(base64Image);
      setProfilePic(base64Image);
    };
  };

  const handleBiometric = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    setBiometricFile(file);
    const response = await getKeyFromFingerPrint(file);
    setBiometric(response.key);
    setLoading(false);
  };

  return (
    <>
      <div className="p-15 flex flex-col justify-center items-center">
        <div className="mb-7 min-w-xs">
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-200">
              Add a Doctor
            </h1>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          id="upload"
          className="hidden"
          onChange={handleProfilePic}
        />
        <label htmlFor="upload" className="cursor-pointer">
          <div className="avatar mb-2">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2 overflow-hidden">
              <img
                src={
                  profilePic
                    ? profilePic
                    : "https://st5.depositphotos.com/81334134/76950/v/450/depositphotos_769508200-stock-illustration-man-profile-vector-professional-male.jpg"
                }
                alt="Default Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </label>
        <p className="mb-6">
          {profilePic ? (
            <>
              <span className="text-gray-200">{profilePicFile.name}</span>
              <span
                className="cursor-pointer text-red-500 ml-3 mt-1"
                onClick={() => setProfilePic(null)}
              >
                ✕
              </span>
            </>
          ) : (
            <>Select a profile picture</>
          )}
        </p>
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
          <div className="mb-3 min-w-xs">
            <select
              defaultValue="Pick a position"
              className="select"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option value="" disabled>
                Pick a position
              </option>
              <option value="Chief Doctor">Chief Doctor</option>
              <option value="Assistant Doctor">Assistant Doctor</option>
              <option value="Senior Doctor">Senior Doctor</option>
              <option value="Junior Doctor">Junior Doctor</option>
            </select>
          </div>
          <div className="mb-7 min-w-xs">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Biometric</legend>
              <input
                type="file"
                className="file-input"
                onChange={handleBiometric}
                accept="image/*"
                required
              />
            </fieldset>
          </div>
          <div className="mb-4 min-w-xs flex justify-center">
            <button
              type="submit"
              className="btn btn-primary min-w-xs"
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 opacity-50 z-10">
                    <Loader className="size-10 animate-spin" />
                  </div>
                </>
              ) : (
                <>Create</>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDoctor;
