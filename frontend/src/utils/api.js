import axiosInstance from "./axios";

const API_URL = "https://biometric-0lyo.onrender.com";

export async function getKeyFromFingerPrint(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(`${API_URL}/getKey`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

  console.log(response.data);
  return response.data;
}

export async function encryptFingerprint(file, text) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("text", text);

  const response = await axiosInstance.post(`${API_URL}/encrypt`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  console.log(response.data);
  return response.data;
}

export async function decryptFingerprint(encryptedData, key) {
  const response = await axiosInstance.post(`${API_URL}/decrypt`, {
    encrypted_data: encryptedData,
    key,
  });

  console.log(response.data);
  return response.data;
}

export async function login(email, password) {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function signup(fullname, email, password) {
  try {
    const response = await axiosInstance.post(`/auth/signup`, {
      fullname,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addDoctor(data){
  try {
    const response = await axiosInstance.post(`/auth/addDoctor`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function checkAuth() {
  try {
    const response = await axiosInstance.get(`/auth/check`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function logout() {
  try {
    const response = await axiosInstance.get(`/auth/logout`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function uploadFile(file, text, biometric) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data || { error: "Unexpected error" };
  }
}

export async function updateDocuments(
  text,
  biometric,
  bytes,
  originalName,
  secure_url,
  format,
  public_id,
  userId
) {
  try {
    const response = await axiosInstance.post(`/document`, {
      text,
      biometric,
      bytes,
      originalName,
      secure_url,
      format,
      public_id,
      userId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data || { error: "Unexpected error" };
  }
}

export async function getDocuments(biometric) {
  try {
    const response = await axiosInstance.get(`/document`, {
      params: { biometric },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data || { error: "Unexpected error" };
  }
}