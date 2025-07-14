import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

// Styled Components
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

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
`;
const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.15;
  margin-bottom: 0.5rem;
  @media (min-width: 640px) {
    font-size: 2.5rem;
  }
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;
const HeroSubtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ScheduleCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px 0 rgba(16, 185, 129, 0.06);
  padding: 1rem;
  margin: 0.5rem auto 0.5rem auto;
  border: 1px solid #f1f5f9;
`;
const ScheduleTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  text-align: left;
`;
const TableWrap = styled.div`
  overflow-x: auto;
`;
const Table = styled.table`
  width: 100%;
  text-align: left;
  font-size: 0.98rem;
`;
const Th = styled.th`
  color: #64748b;
  font-weight: 500;
  padding: 0.5rem 0.5rem;
`;
const Td = styled.td`
  padding: 0.5rem 0.5rem;
`;
const Tr = styled.tr`
  border-top: 1px solid #f1f5f9;
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

const AuthFormWrap = styled.div`
  background: #f0fdf4;
  border-radius: 1rem;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 8px 0 rgba(16, 185, 129, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const AuthTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #16a34a;
  margin-bottom: 0.5rem;
`;
const AuthInput = styled.input`
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
const AuthSelect = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1fae5;
  background: #fff;
  color: #111827;
  font-size: 1rem;
  &:focus {
    outline: 2px solid #bbf7d0;
  }
`;
const AuthButton = styled.button`
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
const AuthSwitch = styled.button`
  background: none;
  border: none;
  color: #22c55e;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;
`;
const ErrorMsg = styled.div`
  color: #dc2626;
  font-size: 0.98rem;
  margin-bottom: 0.5rem;
`;

// SVGs for logo and course illustrations
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

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  // Register form state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('student');
  // Login form state
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');

  // Fetch profile if logged in
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (data) setProfile(data);
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Sign up with Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    // Insert profile (update if already exists)
    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ id: userId, full_name: regName, role: regRole });
      if (profileError) setError(profileError.message);
    }
    setLoading(false);
    setShowLogin(true);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: logEmail,
      password: logPassword,
    });
    if (loginError) setError(loginError.message);
    setLoading(false);
  };

  // Sign out handler
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <PageBg>
      <MainContainer>
        {profile && (
          <div style={{ marginBottom: 16, color: '#16a34a', fontWeight: 600 }}>
            Logged in as: {profile.full_name || 'No Name'} ({profile.role})
          </div>
        )}
        <Navbar profile={profile} handleSignOut={handleSignOut} />
        <HeroSection>
          <HeroTitle>
            Welcome to Monika’s <br className="hidden sm:block" /> English Institute
          </HeroTitle>
          <HeroSubtitle>
            Master the English language with expert guidance
          </HeroSubtitle>
          <ScheduleCard>
            <ScheduleTitle>Course Schedule</ScheduleTitle>
            <TableWrap>
              <Table>
                <thead>
                  <Tr>
                    <Th>COURSE</Th>
                    <Th>DURATION</Th>
                    <Th>DETAILS</Th>
                  </Tr>
                </thead>
                <tbody>
                  <Tr>
                    <Td>Grade 3–12 English</Td>
                    <Td>Ongoing</Td>
                    <Td>Weekly classes</Td>
                  </Tr>
                  <Tr>
                    <Td>IELTS Coaching</Td>
                    <Td>6 weeks</Td>
                    <Td>Exam preparation</Td>
                  </Tr>
                </tbody>
              </Table>
            </TableWrap>
          </ScheduleCard>
        </HeroSection>
        <section>
          <SectionTitle>Our Courses</SectionTitle>
          <CoursesRow>
            <CourseCard>
              <EnglishCourseSVG />
              <CourseName>Grade 3-12 English</CourseName>
            </CourseCard>
            <CourseCard>
              <IELTSCoachingSVG />
              <CourseName>IELTS Coaching</CourseName>
            </CourseCard>
          </CoursesRow>
        </section>
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
