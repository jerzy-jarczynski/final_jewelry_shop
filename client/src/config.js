export const API_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8000/api";

export const API_AUTH_URL =
  process.env.NODE_ENV === "production"
    ? "api/auth"
    : "http://localhost:8000/api/auth";

export const IMGS_URL =
  process.env.NODE_ENV === "production"
    ? "/uploads/"
    : "http://localhost:8000/uploads/";