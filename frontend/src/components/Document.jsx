import React from "react";
import FileImage from "../assets/File.png";
import { formatDateGroup } from "../utils/utils";
import { decryptFingerprint } from "../utils/api";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const Document = ({ doc, biometric }) => {
  const [loading, setLoading] = React.useState(false);
  const [fileDescription, setFileDescription] = React.useState(doc.text);
  const [fileUrl, setFileUrl] = React.useState(doc.documentUrl);

  const handleViewDocument = async () => {
    setLoading(true);
    try {
      const urlDecryptResponse = await decryptFingerprint(
        doc.documentUrl,
        doc.biometric
      );
      setFileUrl(urlDecryptResponse.decrypted_data);
      const textDecryptResponse = await decryptFingerprint(
        doc.text,
        doc.biometric
      );
      setFileDescription(textDecryptResponse.decrypted_data);
      document.getElementById(doc._id).showModal();
    } catch (error) {
      console.error("Error decrypting document:", error);
      setFileDescription("Error decrypting document");
      toast.error("Error decrypting document");
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const filename = fileUrl.split("/").pop().split("?")[0]; // Smart filename

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename); // Force download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL after download
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };




  return (
    <>
      <div className="card bg-base-100 w-60 shadow-xl m-5 text-start">
        <figure>
          <img src={FileImage} className="h-60 w-60 p-10" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {doc.documentName.length > 18
              ? doc.documentName.slice(0, 18) + "..."
              : doc.documentName}
          </h2>
          <div className="card-actions justify-end p-1">
            <p>Size: {Math.round(doc.documentSize / 1024)} kb</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleViewDocument()}
            >
              View
            </button>
          </div>
        </div>
        <dialog id={doc._id} className="modal">
          <form method="dialog">
            <div className="modal-box min-h-[calc(100vh-200px)] min-w-[calc(100vw-800px)] flex flex-row items-center justify-center">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <div className="w-2/3 flex flex-col justify-center items-center h-[calc(100vh-250px)]">
                <img
                  src={FileImage}
                  alt="Document"
                  className="w-80 h-80 mb-7"
                />
                <p className="text-lg">Preview unavailable</p>
              </div>
              <div className="w-1/3 flex h-[calc(100vh-250px)]">
                <div className="mt-10 w-full break-words">
                  <h2 className="text-3xl font-bold mb-4">
                    {doc.documentName}
                  </h2>
                  <p className="text-md mb-2">
                    Size: {Math.round(doc.documentSize / 1024)} kb
                  </p>
                  <p className="text-md mb-2">
                    Uploaded By: {doc.uploadedBy || "Unknown"}
                  </p>
                  <p className="text-md mb-2">
                    Uploaded On: {formatDateGroup(doc.createdAt)}
                  </p>
                  <p className="text-md mt-5 break-words max-w-full mr-2">
                    File Description:{" "}
                    {fileDescription || "No description available"}
                  </p>
                </div>
                <button
                  className="absolute btn btn-primary bottom-10 right-10"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
            </div>
          </form>
        </dialog>

        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 opacity-50 z-10">
            <Loader className="size-10 animate-spin" />
          </div>
        )}
      </div>
    </>
  );
};

export default Document;
