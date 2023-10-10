const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3000'
    : 'https://blog-mern-youssra-5c18cf9600e0.herokuapp.com';

export default { apiUrl };
