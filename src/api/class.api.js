import axios from 'axios';

// [TODO] remove hard code token
export const createClass = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3005/class', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OTEwMWMwOC1kNDE0LTRkMzYtOGEwMy1hMDBlYWZiZmEzZWMiLCJpYXQiOjE3MDg3OTI2MDcsImV4cCI6MTcwODgxMDYwN30.1vJLJyKBtkxr3cW8WX6q8guoRiGkaiUoRDTbRyXsO7o'
        },
    });
    console.log('Data posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
};
