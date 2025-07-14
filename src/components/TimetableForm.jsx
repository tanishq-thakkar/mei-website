import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background: #f0fdf4;
  border-radius: 1rem;
  padding: 1.5rem 1rem;
  margin: 1rem 0;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 8px 0 rgba(16, 185, 129, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Label = styled.label`
  font-weight: 500;
  color: #16a34a;
  margin-bottom: 0.2rem;
`;
const Input = styled.input`
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1fae5;
  background: #fff;
  color: #111827;
  font-size: 1rem;
  &:focus {
    outline: 2px solid #bbf7d0;
  }
`;
const Select = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1fae5;
  background: #fff;
  color: #111827;
  font-size: 1rem;
  &:focus {
    outline: 2px solid #bbf7d0;
  }
`;
const Textarea = styled.textarea`
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1fae5;
  background: #fff;
  color: #111827;
  font-size: 1rem;
  &:focus {
    outline: 2px solid #bbf7d0;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;
const SaveBtn = styled.button`
  background: #16a34a;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  &:hover { background: #15803d; }
`;
const CancelBtn = styled.button`
  background: #f1f5f9;
  color: #374151;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  &:hover { background: #e5e7eb; }
`;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TimetableForm({ initialData = {}, onSave, onCancel, teachers = [], students = [], userRole, classes = [] }) {
  const [form, setForm] = useState({
    student_id: initialData.student_id || '',
    class_id: initialData.class_id || '',
    class_name: initialData.class_name || '',
    day: initialData.day || '',
    start_time: initialData.start_time || '',
    end_time: initialData.end_time || '',
    teacher_id: initialData.teacher_id || '',
    notes: initialData.notes || '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // If classes are present, use class_id, else fallback to class_name
    const submitData = { ...form };
    if (classes && classes.length > 0) {
      submitData.class_id = form.class_id;
      // Optionally, remove class_name if not used
      delete submitData.class_name;
    } else {
      submitData.class_name = form.class_name;
      delete submitData.class_id;
    }
    onSave(submitData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {(userRole === 'teacher' || userRole === 'owner') && form.student_id && (
        <div>
          <Label>Student</Label>
          <Select name="student_id" value={form.student_id} onChange={handleChange} required>
            <option value="">Select student</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.full_name}</option>
            ))}
          </Select>
        </div>
      )}
      <div>
        <Label>Class</Label>
        {classes && classes.length > 0 ? (
          <Select name="class_id" value={form.class_id} onChange={handleChange} required>
            <option value="">Select class</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </Select>
        ) : (
          <Input name="class_name" value={form.class_name} onChange={handleChange} required />
        )}
      </div>
      <div>
        <Label>Day</Label>
        <Select name="day" value={form.day} onChange={handleChange} required>
          <option value="">Select day</option>
          {days.map(d => <option key={d} value={d}>{d}</option>)}
        </Select>
      </div>
      <div>
        <Label>Start Time</Label>
        <Input name="start_time" type="time" value={form.start_time} onChange={handleChange} required />
      </div>
      <div>
        <Label>End Time</Label>
        <Input name="end_time" type="time" value={form.end_time} onChange={handleChange} required />
      </div>
      {(userRole === 'teacher' || userRole === 'owner') && (
        <div>
          <Label>Teacher</Label>
          <Select name="teacher_id" value={form.teacher_id} onChange={handleChange} required>
            <option value="">Select teacher</option>
            {teachers.map(t => (
              <option key={t.id} value={t.id}>{t.full_name}</option>
            ))}
          </Select>
        </div>
      )}
      <div>
        <Label>Notes</Label>
        <Textarea name="notes" value={form.notes} onChange={handleChange} rows={2} />
      </div>
      <ButtonRow>
        <SaveBtn type="submit">Save</SaveBtn>
        <CancelBtn type="button" onClick={onCancel}>Cancel</CancelBtn>
      </ButtonRow>
    </Form>
  );
} 