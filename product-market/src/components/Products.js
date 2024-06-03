import React, { useState, useEffect } from 'react';
import AuthService from './AuthService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Products.module.css'; // CSS modülünü içe aktarın

function Products() {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!AuthService.isUserLogged()) {
        navigate('/login');
        return;
      }

      const user = AuthService.getCurrentUser();
      setCurrentUser(user);

      // Ürünleri yükle
      axios.get('http://localhost:8080/products')
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error('Error fetching products', error);
        });
    };

    fetchCurrentUser();
  }, [navigate]);

  const buyProduct = async (productId) => {
    try {
      const user = AuthService.getCurrentUser();
      await axios.post(`http://localhost:8080/products/buy/${productId}?userId=${user.id}`);
      // Satın alma sonrası ürünleri güncelle
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          product.user = user;
        }
        return product;
      });
      setProducts(updatedProducts);
      await AuthService.updateUser();
      setCurrentUser(AuthService.getCurrentUser());
    } catch (error) {
      console.error('Error buying product', error);
    }
  };

  const cancelProduct = async (productId) => {
    try {
      const user = AuthService.getCurrentUser();
      await axios.post(`http://localhost:8080/products/cancel/${productId}?userId=${user.id}`);
      // İptal sonrası ürünleri güncelle
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          product.user = null;
        }
        return product;
      });
      setProducts(updatedProducts);
      await AuthService.updateUser();
      setCurrentUser(AuthService.getCurrentUser());
    } catch (error) {
      console.error('Error cancelling product', error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <div className={styles.formColumns}>
        <div className={styles.leftColumn}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price (TL)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.productInfo.name}</td>
                  <td>{product.productInfo.price} TL</td>
                  <td>
                    {product.user === null ? (
                      <button onClick={() => buyProduct(product.id)}>Buy</button>
                    ) : (
                      <>
                        <span>Purchased</span>
                        <button onClick={() => cancelProduct(product.id)}>Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {currentUser && (
          <div className={styles.rightColumn}>
            <div className={styles.userInfo}>
              <h3>User Information</h3>
              <p>Name: {currentUser.name}</p>
              <p>Surname: {currentUser.surname}</p>
              <p>Balance: {currentUser.balance} TL</p>
              <p>Credit Card Number: {currentUser.creditCardNumber}</p>
              <p>Credit Card Expiry Date: {currentUser.creditCardExpiryDate}</p>
              <p>Credit Card Security Code: {currentUser.creditCardSecurityCode}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;