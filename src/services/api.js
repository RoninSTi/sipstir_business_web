import axios from 'axios';

const defaultClient = axios.create({
 baseURL: process.env.REACT_APP_API_URL,
 timeout: 10000,
 withCredentials: true,
});

export const refreshAccessTokenFn = async () => {
 const response = await defaultClient.get('auth/refresh');

 return response.data;
};

defaultClient.interceptors.response.use(
 (response) => {
  return response;
 },
 async (error) => {
  console.log({ error });
  const originalRequest = error.config;

  const errMessage = error.response.data.message;
  if (errMessage.includes('not logged in') && !originalRequest._retry) {
   originalRequest._retry = true;
   await refreshAccessTokenFn();
   return defaultClient(originalRequest);
  }
  return Promise.reject(error);
 },
);

const googlePlaceClient = axios.create({
 baseURL: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&key=${process.env.REACT_APP_GOOGLE_PLACE_API_KEY}`,
});

const clients = {
 default: {
  client: defaultClient,
 },
 googlePlace: {
  client: googlePlaceClient,
 },
};

export default clients;
