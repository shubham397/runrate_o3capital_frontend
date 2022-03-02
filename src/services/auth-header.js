export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('token'));
    if (user) {
      return { authorization: `Bearer ${user}` };
    } else {
      return {};
    }
  }