import { deleteAdminTokens, getAdminTokens, setAdminTokens } from "@/server-actions/admin-tokens.action";
import { authAdminService } from "@/services/admin/admin-auth.service";
import axios, { AxiosInstance, AxiosError } from "axios";
import { makeStore } from "../redux/store";

export default class HttpInterceptor {
   private adminAxios: AxiosInstance;
   private http: AxiosInstance;

   private get BASE_URL() {
      // return "https://golden-shop-backend-1.onrender.com/v1";
      return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4200/";
   }

   constructor() {
      this.adminAxios = axios.create({ withCredentials: true, baseURL: this.BASE_URL });
      this.http = axios.create({ withCredentials: true, baseURL: this.BASE_URL });
      this.adminInterceptors();
   }

   private getAdminToken = async () => {
      const tokens = await getAdminTokens();
      return tokens;
   };

   private adminRefreshToken = async () => {
      try {
         const { data } = await this.axios.post("/admin/refresh-token");
         await setAdminTokens({ accessToken: data.authToken });
         return data;
      } catch (error) {
         deleteAdminTokens();
         return error;
      }
   };
   // --- Admin Axios Interceptors
   private adminInterceptors = () => {
      this.adminAxios.interceptors.request.use(async (config) => {
         const token = await this.getAdminToken();
         if (token) {
            (config as any).headers = {
               ...config.headers,
               Authorization: `Bearer ${token.accessToken}`,
            };
         }
         return config;
      });

      this.adminAxios.interceptors.response.use(
         (response) => response,
         async (error: AxiosError) => {
            const status = error.response?.status;
            const originalRequest = error.config as any;
            if ((status === 401 || status === 403) && !originalRequest._retry) {
               originalRequest._retry = true;
               const token = await getAdminTokens();
               if (!token?.accessToken) return;
               await this.adminRefreshToken();
            }
            return Promise.reject(error);
         }
      );
   };

   // --- Error Handler
   protected errorMessage = (error: any) => {
      if (axios.isAxiosError(error)) {
         return {
            message: error?.response?.data?.message || "Server error occurred",
         };
      }
      return { message: "Network error occurred" };
   };

   // --- Expose Instances
   protected get admin(): AxiosInstance {
      return this.adminAxios;
   }

   protected get axios(): AxiosInstance {
      return this.http;
   }
}
