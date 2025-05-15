export default class Environment {
   private IS_PRODUCTION = true;
   private SERVER_URL = this.IS_PRODUCTION //
      ? "http://api.mrvcreations.in/api/v1"
      : "http://localhost:8000/api/v1";

   static get BASE_URL() {
      return new Environment().SERVER_URL;
   }
}
