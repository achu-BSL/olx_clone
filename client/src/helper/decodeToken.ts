import jwtDecode from "jwt-decode";

export const decodeToken = () => {
    try {
        const payload: {username?: string, email?: string} = jwtDecode(localStorage.getItem("token")!);
        return payload.username ? payload.username : null;
    } catch (err) {
        return null
    }
};
