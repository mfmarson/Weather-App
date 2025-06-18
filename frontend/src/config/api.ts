export const API_CONFIG = {
  baseURL: "https://ri6kcctu7e.execute-api.us-east-2.amazonaws.com/stage",
  endpoints: {
    weather: "/weather",
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      verify: "/auth/verify",
    },
  },
};
