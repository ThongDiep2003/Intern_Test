import React from 'react';
import Form from '../components/Form';

function Register() {
  return (
    <>
      <Form isLoginMode={false} />
      <p className="toggle-form">
        Already have an account? <a href="/login">Login</a>
      </p>
    </>
  );
}

export default Register;
