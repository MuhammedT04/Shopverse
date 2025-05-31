import axios from "axios";
import { logout } from "../store/slice/userSlice";
import store from "../store/store";
import { adminLogout } from "../store/slice/adminSlice";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;

    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      if (originalReq.url !== "/api/auth/refresh-token") {
        try {
          const { data } = await api.get("/api/auth/refresh-token");

          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.accesstoken}`;
          originalReq.headers["Authorization"] = `Bearer ${data.accesstoken}`;

          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            const updatedUser = { ...user, accessToken: data.accesstoken };
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
          const adminUser = localStorage.getItem("admin");
          if (adminUser) {
            const admin = JSON.parse(adminUser);
            const updatedAmdin = { ...admin, accessToken: data.accesstoken };
            localStorage.setItem("admin", JSON.stringify(updatedAmdin));
          }

          return api(originalReq);
        } catch (refreshErr) {
          if (localStorage.getItem("admin")) {

            localStorage.removeItem("admin");
            store.dispatch(adminLogout());

          } else if (localStorage.getItem("user")) {

            localStorage.removeItem("user");
            store.dispatch(logout());
            
          }
          return Promise.reject(refreshErr);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;
