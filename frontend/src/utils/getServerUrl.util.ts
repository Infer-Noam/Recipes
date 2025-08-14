export const getServerUrl = () => {
  let serverEndpoint = window.location.origin;
  if (serverEndpoint.includes("localhost")) {
    serverEndpoint = import.meta.env.VITE_API_BASE_URL;
  }
  return `${serverEndpoint}/api`;
};
