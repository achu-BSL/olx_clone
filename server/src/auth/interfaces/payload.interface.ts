
export interface RegisterOtpPayload {
    email: string;
    varified: false;
}
export interface RegisterDetailsPayload {
    email: string;
    varified: true;
}

export interface UserPayload {
    username: string,
    email: string,
    userId: number;
}