import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // make sure to import the CSS

const Dashboard = () => {
  const navigate = useNavigate();
  const [latestStudentId, setLatestStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch('http://localhost:8080/api/students');
        if (!res.ok) throw new Error('Failed fetch');
        const data = await res.json();
        setStudentCount(data.length);
        if (data.length > 0) {
          setLatestStudentId(data[0].id); // or apply your own logic
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  return (
    <div className="dashboard-hero mb-4">
      <div className="overlay">
        <div className="container py-5 text-white">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">
            <div className="info-panel flex-grow-1">
              <h1 className="display-5 fw-bold">Welcome to Student Management</h1>
              <p className="lead">
                Quick access to add, view, and manage your students. Total students:{' '}
                <span className="badge bg-info">{studentCount}</span>
              </p>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <button
                  className="btn btn-lg btn-primary shadow-sm"
                  onClick={() => navigate('/add-student')}
                >
                  + Add Student
                </button>
                <button
                  className="btn btn-lg btn-light text-dark shadow-sm"
                  onClick={() => latestStudentId && navigate(`/view-student/${latestStudentId}`)}
                  disabled={loading || !latestStudentId}
                >
                  View Latest
                </button>
                <button
                  className="btn btn-lg btn-outline-light shadow-sm"
                  onClick={() => navigate('/student-list')}
                >
                  All Students
                </button>
              </div>
            </div>
            <div className="summary-cards d-flex gap-3 flex-wrap mt-3">
              <div className="card stat-card">
                <div className="card-body">
                  <h6 className="text-uppercase">Total Students</h6>
                  <div className="d-flex align-items-center">
                    <div className="fs-1 fw-bold">{studentCount}</div>
                  </div>
                </div>
              </div>
              <div className="card stat-card">
                <div className="card-body">
                  <h6 className="text-uppercase">Actions</h6>
                  <div className="d-flex flex-column">
                    <small>Quick links:</small>
                    <div className="mt-2">
                      <button
                        className="btn btn-sm btn-light me-1 mb-1"
                        onClick={() => navigate('/add-student')}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-sm btn-light me-1 mb-1"
                        onClick={() => navigate('/student-list')}
                      >
                        List
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* you can add more summary cards here, e.g., recent student, etc. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
