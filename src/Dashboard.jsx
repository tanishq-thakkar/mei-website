import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import TimetableTable from './components/TimetableTable';
import TimetableForm from './components/TimetableForm';
import { useNavigate } from 'react-router-dom';

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

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
      } else {
        setProfile(null);
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (!profile) return;
    const fetchUsers = async () => {
      const { data: studentsData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'student');
      setStudents(studentsData || []);
      const { data: teachersData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'teacher');
      setTeachers(teachersData || []);
    };
    fetchUsers();
  }, [profile]);

  useEffect(() => {
    if (!profile) return;
    setLoading(true);
    const fetchTimetable = async () => {
      let query = supabase
        .from('timetables')
        .select('*, teacher:teacher_id(full_name), class:class_id(name)');
      if (profile.role === 'student') {
        // Fetch student's profile to get class_id
        const { data: studentProfile } = await supabase
          .from('profiles')
          .select('class_id')
          .eq('id', profile.id)
          .single();
        if (studentProfile?.class_id) {
          query = query.or(`student_id.eq.${profile.id},class_id.eq.${studentProfile.class_id}`);
        } else {
          query = query.eq('student_id', profile.id);
        }
      }
      const { data } = await query;
      setTimetable(
        (data || []).map((entry) => ({
          ...entry,
          teacher_name: entry.teacher?.full_name || '',
          class_name: entry.class?.name || entry.class_name || '',
        }))
      );
      setLoading(false);
    };
    fetchTimetable();
  }, [profile]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    navigate('/login');
  };

  const handleEdit = (entry) => {
    setEditing(entry);
    setShowForm(true);
  };
  const handleDelete = async (entry) => {
    await supabase.from('timetables').delete().eq('id', entry.id);
    setTimetable((prev) => prev.filter((e) => e.id !== entry.id));
  };
  const handleSave = async (form) => {
    if (editing) {
      await supabase.from('timetables').update(form).eq('id', editing.id);
    } else {
      await supabase.from('timetables').insert([form]);
    }
    setShowForm(false);
    setEditing(null);
    let query = supabase
      .from('timetables')
      .select('*, teacher:teacher_id(full_name)');
    if (profile.role === 'student') {
      query = query.eq('student_id', profile.id);
    }
    const { data } = await query;
    setTimetable(
      (data || []).map((entry) => ({
        ...entry,
        teacher_name: entry.teacher?.full_name || '',
      }))
    );
  };

  if (!profile) return null;

  return (
    <PageBg>
      <MainContainer>
        <Navbar profile={profile} handleSignOut={handleSignOut} />
        <h2 style={{ fontWeight: 700, fontSize: '2rem', margin: '1rem 0' }}>
          {profile.role === 'student' ? 'Your Timetable' : 'All Timetables'}
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <TimetableTable
              timetable={timetable}
              userRole={profile.role}
              onEdit={profile.role !== 'student' ? handleEdit : undefined}
              onDelete={profile.role !== 'student' ? handleDelete : undefined}
            />
            {(profile.role === 'teacher' || profile.role === 'owner') && (
              <>
                {showForm ? (
                  <TimetableForm
                    initialData={editing || {}}
                    onSave={handleSave}
                    onCancel={() => {
                      setShowForm(false);
                      setEditing(null);
                    }}
                    teachers={teachers}
                    students={students}
                    userRole={profile.role}
                  />
                ) : (
                  <button
                    style={{
                      background: '#16a34a',
                      color: '#fff',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.6rem 1.5rem',
                      cursor: 'pointer',
                      marginTop: '1rem',
                    }}
                    onClick={() => setShowForm(true)}
                  >
                    Add Timetable Entry
                  </button>
                )}
              </>
            )}
          </>
        )}
      </MainContainer>
    </PageBg>
  );
} 