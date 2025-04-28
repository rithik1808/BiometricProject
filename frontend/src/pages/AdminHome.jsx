import { useEffect, useState } from "react";
import { checkAuth } from "../utils/api";
import { useNavigate } from "react-router-dom";
import addDoctor from "../assets/AddDoctor.jpg";
import Profile from "../components/Profile";
import dbImage from "../assets/sensitive data.jpg";
import { getDocuments } from "../utils/api";
import Document from "../components/Document";
import AddDoctor from "../components/AddDoctor";

const AdminHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchAuth = async () => {
      const auth = await checkAuth();
      console.log(auth);
      setUser(auth);
      if (!auth.isAdmin) navigate("/");
      if (!auth._id) navigate("/login");
    };

    fetchAuth();
  }, []);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handleViewAll = async () => {
    const resp = await getDocuments("all");
    console.log("Douments", resp);
    setDocuments(resp.documents);
    document.getElementById("my_modal_2").showModal();
  };

  return user ? (
    <div className="flex flex-row">
      <Profile user={user} />
      <div className="flex p-10 h-full">
        <button
          className="card bg-base-100 w-60 shadow-xl m-5 text-start hover:bg-base-200 hover:cursor-pointer hover:opacity-90"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <figure>
            <img src={addDoctor} className="h-60 w-60" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Add Doctor</h2>
            <p>You can add a new doctor here</p>
          </div>
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <AddDoctor/>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <button
          className="card bg-base-100 w-60 shadow-xl m-5 text-start hover:bg-base-200 hover:cursor-pointer hover:opacity-90"
          onClick={handleViewAll}
        >
          <figure>
            <img
              src={dbImage}
              className="h-60 w-60 border-b-2 border-base-300"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">View All Documents</h2>
            <p>You can view all sensitive data and documents here</p>
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
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
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
    </div>
  ) : (
    <div className="flex justify-center items-center h-[calc(100vh-72px)]">
      <span className="loading loading-dots h-13 w-13 mb-40"></span>
    </div>
  );
};

export default AdminHome;
