import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Brand = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  letter-spacing: -0.01em;
  margin-left: 0.25rem;
`;
const Nav = styled.nav`
  display: none;
  gap: 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  @media (min-width: 640px) {
    display: flex;
  }
`;
const NavLink = styled(Link)`
  color: #374151;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #22c55e;
  }
`;
const EnrollBtn = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1.25rem;
  border-radius: 0.75rem;
  background: #22c55e;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 2px 8px 0 rgba(34,197,94,0.10);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #16a34a;
  }
`;
const AuthButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 0.75rem;
  background: #dc2626;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #b91c1c;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#22C55E"/>
    <path d="M10 22V10l6 3.5L22 10v12l-6 3.5L10 22Z" fill="#fff"/>
  </svg>
);

export default function Navbar({ profile, handleSignOut }) {
  return (
    <Header>
      <LogoWrap>
        <Logo />
        <Brand>MEI</Brand>
      </LogoWrap>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {!profile && <NavLink to="/login">Login</NavLink>}
        {profile && <NavLink to="/dashboard">Dashboard</NavLink>}
        {profile && (profile.role === 'teacher' || profile.role === 'owner') && (
          <NavLink to="/timetable-editor">Timetable Editor</NavLink>
        )}
      </Nav>
      <HeaderRight>
        {profile && (
          <AuthButton onClick={handleSignOut}>Sign Out</AuthButton>
        )}
        {!profile && <EnrollBtn>Enroll Now</EnrollBtn>}
      </HeaderRight>
    </Header>
  );
} 