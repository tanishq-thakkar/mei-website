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
const SectionTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;
const CoursesRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;
const CourseCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px 0 rgba(16, 185, 129, 0.06);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #f1f5f9;
`;
const CourseName = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
`;
const CourseDesc = styled.p`
  color: #64748b;
  font-size: 1rem;
  text-align: center;
`;
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#22C55E"/>
    <path d="M10 22V10l6 3.5L22 10v12l-6 3.5L10 22Z" fill="#fff"/>
  </svg>
);
const EnglishCourseSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="60" height="40" rx="8" fill="#F1FDF7"/>
    <rect x="18" y="28" width="44" height="24" rx="4" fill="#22C55E"/>
    <rect x="24" y="34" width="32" height="4" rx="2" fill="#fff"/>
    <rect x="24" y="42" width="20" height="4" rx="2" fill="#fff"/>
    <circle cx="30" cy="54" r="6" fill="#FACC15"/>
    <ellipse cx="54" cy="54" rx="6" ry="6" fill="#16A34A"/>
    <path d="M30 54c0-2 2-4 4-4s4 2 4 4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IELTSCoachingSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="18" width="52" height="44" rx="8" fill="#F1FDF7"/>
    <rect x="22" y="26" width="36" height="28" rx="4" fill="#22C55E"/>
    <rect x="28" y="34" width="24" height="4" rx="2" fill="#fff"/>
    <rect x="28" y="42" width="16" height="4" rx="2" fill="#fff"/>
    <rect x="28" y="50" width="8" height="4" rx="2" fill="#fff"/>
    <rect x="54" y="34" width="4" height="20" rx="2" fill="#FACC15"/>
    <circle cx="56" cy="56" r="4" fill="#16A34A"/>
    <path d="M56 56v-8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function Courses() {
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
          <HeroTitle>Our Courses</HeroTitle>
          <HeroSubtitle>
            Explore our expertly designed English programs for school students and IELTS aspirants. Each course is tailored for success and confidence in English communication.
          </HeroSubtitle>
        </HeroSection>
        <section>
          <SectionTitle>Available Courses</SectionTitle>
          <CoursesRow>
            <CourseCard>
              <EnglishCourseSVG />
              <CourseName>Grade 3-10 English</CourseName>
              <CourseDesc>
                Ongoing batches for school students. Focus on grammar, comprehension, writing, and speaking. Weekly interactive classes.
              </CourseDesc>
            </CourseCard>
            <CourseCard>
              <IELTSCoachingSVG />
              <CourseName>IELTS Coaching</CourseName>
              <CourseDesc>
                6-week intensive program for exam preparation. Includes mock tests, speaking practice, and personalized feedback.
              </CourseDesc>
            </CourseCard>
          </CoursesRow>
        </section>
      </MainContainer>
    </PageBg>
  );
} 