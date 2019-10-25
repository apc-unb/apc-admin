import Cookies from "universal-cookie";

export const isAuthenticated = () => {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  if (jwt === null || admin_data === null) return false;
  return true;
};
