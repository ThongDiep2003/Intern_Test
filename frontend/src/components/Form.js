import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ isLoginMode }) {
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component được render
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (!token) {
        // Nếu không có token, không cần kiểm tra, cho phép đăng nhập/đăng ký
        return;
      }

      try {
        // Gọi API để kiểm tra token
        const response = await fetch('http://localhost:8080/auth/check', {
          method: 'GET',
          headers: { Authorization: token }, // Gửi token trong headers
        });

        if (response.ok) {
          // Token hợp lệ -> Chuyển hướng đến trang success
          navigate('/home');
        } else {
          // Token không hợp lệ -> Xóa token khỏi localStorage
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Error verifying token:', err);
        localStorage.removeItem('token');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/auth';
    const endpoint = isLoginMode ? `${API_URL}/login` : `${API_URL}/register`;

    const payload = isLoginMode
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLoginMode) {
          // Lưu token vào localStorage sau khi đăng nhập thành công
          localStorage.setItem('token', data.token);
          navigate('/home'); // Chuyển đến trang thành công
        } else {
          alert('Registration Successful!');
          navigate('/login'); // Chuyển đến trang đăng nhập
        }
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred.');
    }
  };

  return (
    <div className="form-container">
      <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
      </form>
      
    </div>
  );
}

export default Form;
