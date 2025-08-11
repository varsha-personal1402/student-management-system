import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/students')
      .then((r) => r.json())
      .then((data) => setStudents(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await fetch(`http://localhost:8080/api/students/${id}`, { method: 'DELETE' });
    setStudents((s) => s.filter((st) => st.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Students</h2>
      {students.length === 0 && <p>No students found.</p>}
      {students.map((s) => (
        <div key={s.id} className="card mb-2">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <strong>{s.name}</strong> (ID: {s.id}) <br />
              <small>{s.email} 
</small>
            </div>
            <div>
              <button
                className="btn btn-sm btn-info me-2"
                onClick={() => navigate(`/view-student/${s.id}`)}
              >
                View
              </button>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => navigate(`/edit-student/${s.id}`)}
              >
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
