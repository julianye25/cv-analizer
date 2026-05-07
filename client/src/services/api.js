import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/analyze`;

console.log("BASE_URL:", BASE_URL); // ← aquí
console.log("API_URL:", API_URL); // ← y aquí

export async function analyzeCV(file, email = "") {
  const formData = new FormData();
  formData.append("cv", file);
  if (email) {
    formData.append("email", email);
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
