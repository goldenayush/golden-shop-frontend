import axios from "axios";

export default class AuthAdminService {
   login = (credentials: any) => axios.post("/auth/login", credentials);
}
