import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', course: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/students/${id}`)
      .then((r) => r.json())
      .then((data) => setForm({ name: data.name, email: data.email, course: data.course }))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    navigate(`/view-student/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Student</h2>
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
          <label>Course</label>
          <input
            className="form-control"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
          />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;
