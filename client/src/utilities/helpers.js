import jwt_decode from "jwt-decode";

export function isExpired(token) {
    return jwt_decode(token).exp * 1000 < Date.now();
}
