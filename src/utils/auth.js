import { jwtDecode } from "jwt-decode";

export function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function getDecodedToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
