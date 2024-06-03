import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(API_URL + 'login', {
        username,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('isUser', true);
        return response.data;
      } else if (response.status === 400) {
        throw new Error('Username or password does not match');
      }
    } catch (error) {
      console.error('Error logging in', error);
      throw error;
    }
  }

  async register(username, password, name, surname, balance, creditCardNumber, creditCardExpiryDate, creditCardSecurityCode) {
    try {
      const response = await axios.post(API_URL + 'register', {
        username,
        password,
        name,
        surname,
        balance,
        creditCardNumber,
        creditCardExpiryDate,
        creditCardSecurityCode
      });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      } else if (response.status === 409) {
        throw new Error('Username already exists');
      }
    } catch (error) {
      console.error('Error registering', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.setItem('isUser', false);
    return axios.post(API_URL + 'logout');
  }
 
  async updateUser(){

  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.id) {
    try {
      const response = await axios.get(`${API_URL}fetchuser`, {
        params: { userId: storedUser.id }
      });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        //return response.data;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  return null;
  }
  
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  isUserLogged() {
	return localStorage.getItem('isUser') === "true";
  }
  
 
}

export default new AuthService();
