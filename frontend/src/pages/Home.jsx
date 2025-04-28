import React, { useEffect, useState } from "react";
import { checkAuth } from "../utils/api";
import { useNavigate } from "react-router-dom";
import dbImage from "../assets/sensitive data.jpg";
import sensitiveDataImage from "../assets/senstive data upload.png";
import Profile from "../components/Profile";
import toast from "react-hot-toast";
import UploadSensitiveData from "../components/UploadSensitiveData";
import biometricImage from "../assets/biometric.png";
import { getKeyFromFingerPrint, getDocuments } from "../utils/api";
import { Loader } from "lucide-react";
import Document from "../components/Document";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [biometric, setBiometric] = useState(null);
  const [selectedModal, setSelectedModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchAuth = async () => {
      await timeout(3000);
      const auth = await checkAuth();
      console.log(auth);
      setUser(auth);
      if (!auth._id) navigate("/login");
      if (auth.isAdmin) navigate("/admin");
    };

    fetchAuth();
  }, []);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  function showModal(modal) {
    setSelectedModal(modal);
    document.getElementById("biometric_modal").showModal();
  }

  const handleBiometric = async (e, file) => {
    document.getElementById("biometric_modal").close();
    setLoading(true);
    const response = await getKeyFromFingerPrint(file);
    console.log(response);
    if (response.key === user.biometric) {
      toast.success("Biometric verified successfully");
      setBiometric(file);
      if (selectedModal === "my_modal_2") {
        console.log(user.biometric);
        const resp = await getDocuments(user.biometric);
        console.log("Douments", resp);
        setDocuments(resp.documents);
      }
      document.getElementById(selectedModal).showModal();
    } else {
      toast.error("Biometric verification failed");
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return user ? (
    <div className="flex flex-row">
      <Profile user={user} />
      <div className="flex p-10 h-full">
        <button
          className="card bg-base-100 w-60 shadow-xl m-5 text-start hover:bg-base-200 hover:cursor-pointer hover:opacity-90"
          onClick={() => showModal("my_modal_1")}
        >
          <figure>
            <img
              src={sensitiveDataImage}
              className="h-60 w-60 border-b-2 border-base-300"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Upload</h2>
            <p>You can upload your sensitive data and documents here </p>
          </div>
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-center ">
              Upload your sensitive data
            </h3>
            <div className="py-4">
              <UploadSensitiveData
                modal={selectedModal}
                biometric={user.biometric}
                biometricFile={biometric}
                user={user}
              />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <button
          className="card bg-base-100 w-60 shadow-xl m-5 text-start hover:bg-base-200 hover:cursor-pointer hover:opacity-90"
          onClick={() => showModal("my_modal_2")}
        >
          <figure>
            <img
              src={dbImage}
              className="h-60 w-60 border-b-2 border-base-300"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">View Documents</h2>
            <p>You can view all your sensitive data and documents uploaded by you</p>
          </div>
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box min-w-[calc(100vw-300px)]">
            <div className="h-[calc(100vh-200px)]">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <Document
                      key={doc._id}
                      doc={doc}
                      biometric={user.biometric}
                      biometricFile={biometric}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <p>No documents found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <dialog id="biometric_modal" className="modal">
        {loading ? (
          <div className="flex items-center justify-center h-screen z-50">
            <Loader className="size-10 animate-spin" />
          </div>
        ) : (
          <div className="modal-box flex items-center justify-center">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕  
              </button>
              <input
                type="file"
                accept="image/*"
                id="biometricImage"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleBiometric(e, e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="biometricImage" className="cursor-pointer">
                <img
                  src={biometricImage}
                  alt="Biometric"
                  className="w-70 h-70 hover:opacity-80 transition"
                />
              </label>
            </form>
          </div>
        )}
      </dialog>
    </div>
  ) : (
    <div className="flex justify-center items-center h-[calc(100vh-72px)]">
      <span className="loading loading-dots h-13 w-13 mb-40"></span>
    </div>
  );
};

export default Home;
