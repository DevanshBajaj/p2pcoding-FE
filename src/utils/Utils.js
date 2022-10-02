const isLoggedIn = () => localStorage.getItem("token") ? true : false;

const getJWT = () => localStorage.getItem("token");

const setJWT = (token) => localStorage.setItem("token", token);

export { isLoggedIn, getJWT, setJWT };