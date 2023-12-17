import axios from 'axios';

axios.get('http://localhost:3000/api/products/search?zipcode=1')
  .then((response: { data: any; }) => {
    console.log(response.data);
  })
  .catch((error: any) => {
    console.error('Error:', error);
  });