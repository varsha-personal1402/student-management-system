import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [form, setForm] = useState({ name: '', email: '', age: ''  ,course: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    navigate('/student-list');
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Name</label>
          <input
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
         <div className="mb-2">
          <label>Age</label>
          <input
            className="form-control"
            type="age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label>Course</label>
          <input
            className="form-control"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
          />
        </div>
        <button className="btn btn-success">Save</button>
      </form>
    </div>
  );
};

export default AddStudent;
