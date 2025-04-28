// EncryptComponent.jsx
import React, { useEffect, useState } from "react";
import {
  encryptFingerprint,
  decryptFingerprint,
  uploadFile,
} from "../utils/api";
import uploadImage from "../assets/upload.png";
import uploadedFile from "../assets/File.png";
import { updateDocuments } from "../utils/api";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

function UploadSensitiveData(props) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const handleEncrypt = async () => {
    try {
      setLoading(true);
      console.log(file);
      console.log(props.biometric);
      let fileUploadRes;
      if (file) {
        const renamedFile = new File([file], file.name.replace(/\s+/g, "_"), {
          type: file.type,
        });
        fileUploadRes = await uploadFile(renamedFile, text, props.biometric);
        console.log(fileUploadRes);
      }
      const encrypted_fileUrl = await encryptFingerprint(
        props.biometricFile,
        fileUploadRes.url
      );
      const encrypted_text = await encryptFingerprint(
        props.biometricFile,
        text
      );

      const updateDocument = await updateDocuments(
        encrypted_text.encrypted_data,
        encrypted_text.key,
        fileUploadRes.bytes,
        fileUploadRes.originalName,
        encrypted_fileUrl.encrypted_data,
        fileUploadRes.format,
        fileUploadRes.public_id,
        props.user.fullname + " (" + props.user.position + ")"
      );

      if (updateDocument.document) {
        document.getElementById(props.modal).close();
      }
      setLoading(false);
      toast.success("Document uploaded successfully");
      setFile(null);
      setText("");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      loading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? (
        <>
          <div className="flex items-center justify-center h-full">
            <Loader className="size-10 animate-spin" />
          </div>
        </>
      ) : (
        <>
          <input
            type="file"
            id="upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="upload" className="cursor-pointer">
            {file ? (
              <div>
                <img
                  src={uploadedFile}
                  alt="Upload"
                  className="w-50 h-50 hover:opacity-80 m-10 transition"
                />
                {/* Close icon */}
                <button // define this function to clear the file
                  className="absolute top-30 right-35 text-white-600 bg-red-800 font-bold text-2xl px-2 py-1 rounded-full cursor-pointer "
                  onClick={() => setFile(null)}
                >
                  ✕
                </button>
                <div className="text-center mb-5">
                  <p className="text-wrap">{file.name}</p>
                  <p>Size : {Math.round(file.size / 1024)} kb</p>
                </div>
                <></>
              </div>
            ) : (
              <img
                src={uploadImage}
                alt="Upload"
                className="w-70 h-70 hover:opacity-80 transition"
              />
            )}
          </label>
          <textarea
            className="textarea"
            placeholder="File Description"
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleEncrypt} className="btn btn-primary mt-5">
            Encrypt and Upload
          </button>
        </>
      )}
    </div>
  );
}

export default UploadSensitiveData;
