import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi trang được tải
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (!token) {
        // Không có token -> Chuyển về trang đăng nhập
        navigate('/login');
        return;
      }

      try {
        // Gọi API kiểm tra token
        const response = await fetch('http://localhost:8080/auth/check', {
          method: 'GET',
          headers: { Authorization: token }, // Gửi token trong header
        });

        if (!response.ok) {
          // Token không hợp lệ -> Xóa token và chuyển về trang đăng nhập
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error('Error verifying token:', err);
        localStorage.removeItem('token'); // Xóa token khi có lỗi
        navigate('/login'); // Chuyển về trang đăng nhập
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    // Xóa token và chuyển về trang đăng nhập
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h1>Welcome to Dashboard!</h1>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
