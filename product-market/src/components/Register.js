import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  //const [balance, setBalance] = useState(0);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [creditCardExpiryDate, setCreditCardExpiryDate] = useState('');
  const [creditCardSecurityCode, setCreditCardSecurityCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!username || !password || !name || !surname || !creditCardNumber || !creditCardExpiryDate || !creditCardSecurityCode) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      await AuthService.register(
        username,
        password,
        name,
        surname,
        120000,
        creditCardNumber,
        creditCardExpiryDate,
        creditCardSecurityCode
      );
      console.log('Register successful');
      navigate('/products');
    } catch (error) {
      setErrorMessage('Failed to register. Please try again.');
    }
  };

    return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleRegister}>
        <div className="form-columns">
          <div className="left-column">
            <div>
              <label>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label>Surname</label>
              <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
          </div>
          <div className="right-column">
            <div>
              <label>Credit Card Number</label>
              <input type="text" value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)} />
            </div>
            <div>
              <label>Credit Card Expiry Date</label>
              <input type="text" value={creditCardExpiryDate} onChange={(e) => setCreditCardExpiryDate(e.target.value)} />
            </div>
            <div>
              <label>Credit Card Security Code</label>
              <input type="text" value={creditCardSecurityCode} onChange={(e) => setCreditCardSecurityCode(e.target.value)} />
            </div>
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Register;