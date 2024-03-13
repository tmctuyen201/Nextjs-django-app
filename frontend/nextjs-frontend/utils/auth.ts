export function isAuthenticated(): boolean {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
}
