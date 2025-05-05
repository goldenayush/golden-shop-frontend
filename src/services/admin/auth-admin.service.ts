import axios from "axios";

export default class AuthAdminService {
   _loginApi = (credentials: any) => axios.post("/auth/login", credentials);
}
