import axios from 'axios';

const API_URL = '/api/analyze';

export async function analyzeCV(file, email = '') {
  const formData = new FormData();
  formData.append('cv', file);
  if (email) {
    formData.append('email', email);
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
}