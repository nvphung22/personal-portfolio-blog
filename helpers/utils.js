export const getCookieFromReq = (req, cookieKey) => {
    const cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${cookieKey}=`));
    if (!cookie) {
        return undefined; // or return false
    }
    return cookie.split('=')[1];
}