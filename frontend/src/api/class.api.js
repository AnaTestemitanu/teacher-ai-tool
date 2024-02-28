import axios from 'axios';

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OTEwMWMwOC1kNDE0LTRkMzYtOGEwMy1hMDBlYWZiZmEzZWMiLCJpYXQiOjE3MDg4Mzk4MTUsImV4cCI6MTcwODg1NzgxNX0.U2ti5ix63dtJrpkX7uv-1z9IGjpyXxKoR5x5WogKRD0"

// [TODO] remove hard code token
export const createClass = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3005/class', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': TOKEN
        },
    });
    console.log('Data posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

export const getClasses = async () => {
  try {
    const response = await axios.get('http://localhost:3005/class', {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': TOKEN
        },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}