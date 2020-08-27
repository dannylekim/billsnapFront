/**
 * Parses any JWT by and giving you the body without validation or requirement of the signature
 *
 * @param token to be decrypted
 * @returns {any} the payload or an error
 */
const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

/**
 * returns if the jwt token is expired or not
 *
 * @param token to verify
 * @returns {boolean} if expired or not
 */
export const isExpired = (token) => {
  try {
    const parsedJwt = parseJwt(token);
    return parsedJwt.exp < Date.now() / 1000;
  } catch (e) {
    return true;
  }
};
