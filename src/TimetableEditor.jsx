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
const Section = styled.section`
  margin-bottom: 2rem;
`;
const Label = styled.label`
  color: #16a34a;
  font-weight: 600;
  margin-right: 8px;
`;
const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1fae5;
  font-size: 1rem;
`;
const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1fae5;
  font-size: 1rem;
`;
const Button = styled.button`
  background: #16a34a;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  margin-left: 8px;
  margin-top: 0.5rem;
`;
const SmallButton = styled.button`
  background: #f1f5f9;
  color: #16a34a;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  margin-left: 8px;
`;
const ErrorMsg = styled.div`
  color: #dc2626;
  margin-top: 0.5rem;
`;

export default function TimetableEditor() {
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [classStudents, setClassStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [timetable, setTimetable] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [classError, setClassError] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [assignStudentId, setAssignStudentId] = useState('');
  const navigate = useNavigate();

  // Fetch profile and role
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
        if (data.role !== 'teacher' && data.role !== 'owner') {
          navigate('/');
        }
      } else {
        setProfile(null);
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  // Fetch all classes
  useEffect(() => {
    if (!profile) return;
    const fetchClasses = async () => {
      const { data } = await supabase.from('classes').select('*').order('name');
      setClasses(data || []);
    };
    fetchClasses();
  }, [profile]);

  // Fetch all students and teachers
  useEffect(() => {
    if (!profile) return;
    const fetchUsers = async () => {
      const { data: studentsData } = await supabase
        .from('profiles')
        .select('id, full_name, class_id')
        .eq('role', 'student');
      setStudents(studentsData || []);
      const { data: teachersData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('role', ['teacher', 'owner']);
      setTeachers(teachersData || []);
    };
    fetchUsers();
  }, [profile]);

  // Fetch students in selected class
  useEffect(() => {
    if (!selectedClass) {
      setClassStudents([]);
      return;
    }
    const fetchClassStudents = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'student')
        .eq('class_id', selectedClass);
      setClassStudents(data || []);
    };
    fetchClassStudents();
  }, [selectedClass]);

  // Fetch timetable for selected student (and class filter)
  useEffect(() => {
    if (!selectedStudent && !selectedClass) {
      setTimetable([]);
      return;
    }
    setLoading(true);
    const fetchTimetable = async () => {
      let query = supabase
        .from('timetables')
        .select('*, teacher:teacher_id(full_name), class:class_id(name)');
      
      if (selectedStudent) {
        query = query.eq('student_id', selectedStudent);
      } else if (selectedClass) {
        query = query.eq('class_id', selectedClass);
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
  }, [selectedStudent, selectedClass]);

  // Create new class
  const handleCreateClass = async () => {
    setClassError('');
    if (!newClassName.trim()) {
      setClassError('Class name required');
      return;
    }
    const { error } = await supabase.from('classes').insert([{ name: newClassName.trim() }]);
    if (error) {
      setClassError(error.message);
    } else {
      setNewClassName('');
      // Refresh class list
      const { data } = await supabase.from('classes').select('*').order('name');
      setClasses(data || []);
    }
  };

  // Assign student to class
  const handleAssignStudent = async () => {
    if (!assignStudentId || !selectedClass) return;
    setAssigning(true);
    await supabase.from('profiles').update({ class_id: selectedClass }).eq('id', assignStudentId);
    setAssigning(false);
    setAssignStudentId('');
    // Refresh class students
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('role', 'student')
      .eq('class_id', selectedClass);
    setClassStudents(data || []);
  };

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
    // Attach class_id if selected
    const formWithClass = { ...form };
    if (selectedClass) formWithClass.class_id = selectedClass;
    console.log('handleSave called', { formWithClass, selectedStudent, selectedClass, classStudents });
    let error = null;
    if (editing) {
      // Editing existing entry
      const { error: updateError } = await supabase.from('timetables').update(formWithClass).eq('id', editing.id);
      error = updateError;
    } else {
      // Adding new entry
      if (selectedStudent) {
        // Add for specific student
        const { error: insertError } = await supabase.from('timetables').insert([formWithClass]);
        error = insertError;
      } else if (selectedClass) {
        if (classStudents.length === 0) {
          alert('No students in this class. Please assign students first.');
          return;
        }
        // Deduplicate students by id
        const uniqueStudents = Array.from(new Set(classStudents.map(s => s.id)))
          .map(id => classStudents.find(s => s.id === id));
        const classObj = classes.find(c => c.id === selectedClass);
        const entries = uniqueStudents.map(student => ({
          ...formWithClass,
          student_id: student.id,
          class_name: classObj ? classObj.name : ''
        }));
        const { error: insertError } = await supabase.from('timetables').insert(entries);
        error = insertError;
      }
    }
    if (error) {
      alert('Failed to add timetable entry: ' + error.message);
      return;
    }
    setShowForm(false);
    setEditing(null);
    // Refresh timetable
    let query = supabase
      .from('timetables')
      .select('*, teacher:teacher_id(full_name), class:class_id(name)');
    if (selectedStudent) {
      query = query.eq('student_id', selectedStudent);
    } else if (selectedClass) {
      query = query.eq('class_id', selectedClass);
    }
    const { data } = await query;
    setTimetable(
      (data || []).map((entry) => ({
        ...entry,
        teacher_name: entry.teacher?.full_name || '',
        class_name: entry.class?.name || entry.class_name || '',
      }))
    );
  };

  if (!profile) return null;

  return (
    <PageBg>
      <MainContainer>
        <Navbar profile={profile} handleSignOut={handleSignOut} />
        <h2 style={{ fontWeight: 700, fontSize: '2rem', margin: '1rem 0' }}>
          Timetable Editor
        </h2>
        {/* Class Management Section */}
        <Section>
          <h3 style={{ color: '#16a34a', fontWeight: 600, marginBottom: 8 }}>Class Management</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Label htmlFor="class-select">Select Class:</Label>
            <Select
              id="class-select"
              value={selectedClass}
              onChange={e => {
                setSelectedClass(e.target.value);
                setSelectedStudent('');
              }}
            >
              <option value="">-- All Classes --</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </Select>
            <Input
              type="text"
              placeholder="New class name"
              value={newClassName}
              onChange={e => setNewClassName(e.target.value)}
              style={{ marginLeft: 16 }}
            />
            <Button onClick={handleCreateClass}>Create Class</Button>
          </div>
          {classError && <ErrorMsg>{classError}</ErrorMsg>}
        </Section>
        {/* Assign Student to Class */}
        {selectedClass && (
          <Section>
            <h4 style={{ color: '#16a34a', fontWeight: 500, marginBottom: 4 }}>Assign Student to Class</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <Select
                value={assignStudentId}
                onChange={e => setAssignStudentId(e.target.value)}
              >
                <option value="">-- Select Student --</option>
                {students.filter(s => s.class_id !== selectedClass).map(s => (
                  <option key={s.id} value={s.id}>{s.full_name}</option>
                ))}
              </Select>
              <SmallButton onClick={handleAssignStudent} disabled={assigning || !assignStudentId}>
                {assigning ? 'Assigning...' : 'Assign'}
              </SmallButton>
            </div>
            <div style={{ marginTop: 8 }}>
              <b>Students in this class:</b>
              <ul>
                {classStudents.map(s => (
                  <li key={s.id}>{s.full_name}</li>
                ))}
                {classStudents.length === 0 && <li style={{ color: '#64748b' }}>No students yet.</li>}
              </ul>
            </div>
          </Section>
        )}
        {/* Student Selection and Timetable */}
        <Section>
          <Label htmlFor="student-select">Select Student:</Label>
          <Select
            id="student-select"
            value={selectedStudent}
            onChange={e => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Select --</option>
            {(selectedClass ? classStudents : students).map(s => (
              <option key={s.id} value={s.id}>{s.full_name}</option>
            ))}
          </Select>
        </Section>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <TimetableTable
              timetable={timetable}
              userRole={profile.role}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {(selectedStudent || (selectedClass && classStudents.length > 0)) && (
              <>
                {showForm ? (
                  <TimetableForm
                    initialData={editing || { 
                      student_id: selectedStudent || '', 
                      class_id: selectedClass 
                    }}
                    onSave={handleSave}
                    onCancel={() => {
                      setShowForm(false);
                      setEditing(null);
                    }}
                    teachers={teachers}
                    students={students}
                    userRole={profile.role}
                    classes={classes}
                  />
                ) : (
                  <Button
                    onClick={() => setShowForm(true)}
                    style={{ marginTop: '1rem' }}
                  >
                    {selectedStudent ? 'Add Timetable Entry' : `Add Timetable Entry for All Students in ${classes.find(c => c.id === selectedClass)?.name || 'Class'}`}
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </MainContainer>
    </PageBg>
  );
} 