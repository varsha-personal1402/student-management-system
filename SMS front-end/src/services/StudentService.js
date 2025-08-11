import axios from 'axios';

// Base URL of the backend API
const BASE_URL = 'http://localhost:8080/api/students';

class StudentService {
  // Get all students
  getAllStudents() {
    return axios
      .get(BASE_URL)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching students:", error);
        throw error;
      });
  }

  // Get a student by ID
  getStudentById(id) {
    return axios
      .get(`${BASE_URL}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching student with ID ${id}:`, error);
        throw error;
      });
  }

  // Add a new student
  addStudent(student) {
    return axios
      .post(BASE_URL, student)
      .then(response => response.data)
      .catch(error => {
        console.error("Error adding student:", error);
        throw error;
      });
  }

  // Update an existing student
  updateStudent(id, student) {
    return axios
      .put(`${BASE_URL}/${id}`, student)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error updating student with ID ${id}:`, error);
        throw error;
      });
  }

  // Delete a student by ID
  deleteStudent(id) {
    return axios
      .delete(`${BASE_URL}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error deleting student with ID ${id}:`, error);
        throw error;
      });
  }
}

// Export a singleton instance
export default new StudentService();
