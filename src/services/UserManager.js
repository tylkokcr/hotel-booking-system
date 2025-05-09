export default class UserManager {
    constructor() {
      this.users = [
        { username: "admin", password: "1234" },
        { username: "guest", password: "abcd" }
      ];
    }
  
    login(username, password) {
      const user = this.users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        return user;
      }
      return null;
    }
  
    logout() {
      sessionStorage.removeItem("loggedInUser");
    }
  
    getLoggedInUser() {
      const user = sessionStorage.getItem("loggedInUser");
      return user ? JSON.parse(user) : null;
    }
  }
  