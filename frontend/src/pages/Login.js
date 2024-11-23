import React from 'react';
import Form from '../components/Form';

function Login() {
  return (
    <>
      <Form isLoginMode={true} />
      <p className="toggle-form">
        Don't have an account? <a href="/">Register</a>
      </p>
    </>
  );
}

export default Login;
