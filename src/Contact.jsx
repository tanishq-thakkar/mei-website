import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageBg = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdf4 0%, #fff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px 0 rgba(16, 185, 129, 0.08);
  margin: 1.5rem 0 2rem 0;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 640px) {
    padding: 2.5rem 3rem;
  }
`;
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
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
`;
const HeroTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.15;
  margin-bottom: 0.5rem;
  @media (min-width: 640px) {
    font-size: 2.7rem;
  }
  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`;
const HeroSubtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;
const ContactSection = styled.section`
  width: 100%;
  background: #22c55e;
  border-radius: 1.25rem;
  padding: 2rem 1rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContactTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
  max-width: 400px;
`;
const ContactForm = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
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
const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
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
const SendBtn = styled.button`
  margin-top: 0.5rem;
  align-self: flex-end;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  background: #16a34a;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 2px 8px 0 rgba(34,197,94,0.10);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #15803d;
  }
`;
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#22C55E"/>
    <path d="M10 22V10l6 3.5L22 10v12l-6 3.5L10 22Z" fill="#fff"/>
  </svg>
);

export default function Contact() {
  return (
    <PageBg>
      <MainContainer>
        <Header>
          <LogoWrap>
            <Logo />
            <Brand>MEI</Brand>
          </LogoWrap>
          <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </Nav>
          <EnrollBtn>Enroll Now</EnrollBtn>
        </Header>
        <HeroSection>
          <HeroTitle>Contact Us</HeroTitle>
          <HeroSubtitle>
            Have questions or want to book a trial class? Fill out the form and we'll get back to you soon.
          </HeroSubtitle>
        </HeroSection>
        <ContactSection>
          <ContactTitle>Get in Touch</ContactTitle>
          <ContactForm>
            <Input type="text" placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Textarea placeholder="Message" rows={3} />
            <SendBtn type="submit">Send</SendBtn>
          </ContactForm>
        </ContactSection>
      </MainContainer>
    </PageBg>
  );
} 