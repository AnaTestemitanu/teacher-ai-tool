import axios from 'axios';

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OTEwMWMwOC1kNDE0LTRkMzYtOGEwMy1hMDBlYWZiZmEzZWMiLCJpYXQiOjE3MDg4MjY2MjAsImV4cCI6MTcwODg0NDYyMH0.lKPbbhTvX5fkQ99UADLMW_ZPNyfWLdCv8a3kpfnwGPQ"

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