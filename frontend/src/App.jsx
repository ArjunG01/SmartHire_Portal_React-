import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicJobs from './pages/PublicJobs';
import JobDetails from './pages/JobDetails';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobApplications from './pages/JobApplications';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<PublicJobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/seeker-dashboard" element={<JobSeekerDashboard />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/jobs/:jobId/applications" element={<JobApplications />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
