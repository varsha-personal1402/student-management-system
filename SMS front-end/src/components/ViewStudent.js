import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewStudent.css';

const ViewStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/students/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setStudent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!student) return <p className="text-danger">Student not found.</p>;

  return (
    <div className="view-student-wrapper">
      <div className="view-student-card">
        <div className="view-student-header">
          <h3>{student.name}</h3>
          <div className="id-badge">ID: {student.id}</div>
        </div>
        <div className="view-student-body">
          <div className="field-group">
            <label>Email</label>
            <div className="value">{student.email}</div>
          </div>
          <div className="field-group">
            <label>Age</label>
            <div className="value">{student.age}</div>
          </div>
          <div className="field-group">
            <label>Course</label>
            <div className="value">{student.course}</div>
          </div>
          {/* add more fields if needed */}
        </div>
        <div className="view-student-footer">
          <div className="left">
            <button className="btn-back" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
