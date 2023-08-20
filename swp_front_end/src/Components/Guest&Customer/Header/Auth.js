const TOKEN_KEY = 'authToken';

export const isLoggedIn = () => {
  return !!localStorage.getItem("userId");
};

export const login = (userData) => {
    localStorage.setItem(TOKEN_KEY, userData.token);
    // Store more user information, including user ID
    localStorage.setItem('userData', JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem("userId");
};