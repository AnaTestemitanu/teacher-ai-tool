import axios from 'axios';

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OTEwMWMwOC1kNDE0LTRkMzYtOGEwMy1hMDBlYWZiZmEzZWMiLCJpYXQiOjE3MDkwNDQwNTEsImV4cCI6MTcwOTA2MjA1MX0.yK2SaXUFKt2XiR1Qcs8fK2hQ9d1Lv5fMoP-0FKqLSsE"

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