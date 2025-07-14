import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from './supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const PageBg = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdf4 0%, #fff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormWrap = styled.div`
  background: #f0fdf4;
  border-radius: 1rem;
  padding: 2rem 1rem;
  margin-top: 3rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 8px 0 rgba(16, 185, 129, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #16a34a;
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1fae5;
  background: #fff;
  color: #111827;
  font-size: 1rem;
  &::placeholder {
    color: #94a3b8;
  }
  &:focus {
    outline: 2px solid #bbf7d0;
  }
`;
const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  background: #16a34a;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #15803d;
  }
`;
const Switch = styled(Link)`
  color: #22c55e;
  font-weight: 500;
  text-decoration: underline;
  margin-top: 0.5rem;
  display: inline-block;
`;
const ErrorMsg = styled.div`
  color: #dc2626;
  font-size: 0.98rem;
  margin-bottom: 0.5rem;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (loginError) setError(loginError.message);
    else navigate('/');
    setLoading(false);
  };

  return (
    <PageBg>
      <FormWrap>
        <form onSubmit={handleLogin}>
          <Title>Login</Title>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
        </form>
        <Switch to="/register">Don't have an account? Register</Switch>
      </FormWrap>
    </PageBg>
  );
} 