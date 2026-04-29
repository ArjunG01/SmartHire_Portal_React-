import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [jobData, setJobData] = useState({
        title: '', description: '', companyName: '', location: '', jobType: 'Full-time', skillsRequired: '', vacancy: 1, status: 'OPEN'
    });

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            const res = await api.get('/jobs/my-jobs');
            setJobs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await api.delete(`/jobs/${id}`);
            fetchMyJobs();
        } catch (err) {
            alert('Failed to delete job');
        }
    };

    const handleOpenCreateModal = () => {
        setIsEditMode(false);
        setJobData({ title: '', description: '', companyName: '', location: '', jobType: 'Full-time', skillsRequired: '', vacancy: 1, status: 'OPEN' });
        setShowModal(true);
    };

    const handleOpenEditModal = (job) => {
        setIsEditMode(true);
        setSelectedJobId(job.id);
        setJobData({
            title: job.title,
            description: job.description,
            companyName: job.companyName,
            location: job.location,
            jobType: job.jobType,
            skillsRequired: job.skillsRequired,
            vacancy: job.vacancy || 1,
            status: job.status || 'OPEN'
        });
        setShowModal(true);
    };

    const handleSubmitJob = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await api.put(`/jobs/${selectedJobId}`, jobData);
            } else {
                await api.post('/jobs/', jobData);
            }
            setShowModal(false);
            fetchMyJobs();
        } catch (err) {
            alert(isEditMode ? 'Failed to update job' : 'Failed to post job');
        }
    };

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="fw-bold mb-1">Recruiter Hub</h2>
                    <p className="text-muted mb-0">Manage your job postings and applicants</p>
                </div>
                <Button variant="primary" size="lg" className="px-4 shadow-sm" onClick={handleOpenCreateModal}>+ Post New Job</Button>
            </div>

            <Row>
                {jobs.length > 0 ? jobs.map(job => (
                    <Col md={6} lg={4} key={job.id} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body className="p-4 d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <Card.Title className="fw-bold fs-5 mb-1">{job.title}</Card.Title>
                                        <Card.Subtitle className="text-muted small">{job.companyName}</Card.Subtitle>
                                    </div>
                                    <Badge bg={job.status === 'FILLED' ? 'secondary' : 'success'} className="fw-normal">
                                        {job.status || 'Active'}
                                    </Badge>
                                </div>

                                <div className="mb-4 flex-grow-1">
                                    <div className="text-muted small mb-2">
                                        <strong>Location:</strong> {job.location}
                                    </div>
                                    <div className="text-muted small mb-2">
                                        <strong>Vacancy:</strong> {job.vacancy || 1}
                                    </div>
                                    <div className="text-muted small">
                                        <strong>Posted:</strong> {new Date(job.postedDate).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="d-grid gap-2">
                                    <Link to={`/jobs/${job.id}/applications`} className="btn btn-outline-primary btn-sm">
                                        View Applicants
                                    </Link>
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-secondary" size="sm" className="flex-grow-1" onClick={() => handleOpenEditModal(job)}>Edit</Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteJob(job.id)}>Delete</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                )) : (
                    <Col className="text-center py-5">
                        <p className="lead text-muted">You haven't posted any jobs yet.</p>
                        <Button variant="primary" onClick={handleOpenCreateModal}>Create Your First Job</Button>
                    </Col>
                )}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">{isEditMode ? 'Edit Job' : 'Post a New Job'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={handleSubmitJob}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">Job Title</Form.Label>
                                    <Form.Control required value={jobData.title} onChange={(e) => setJobData({ ...jobData, title: e.target.value })} placeholder="e.g. Senior Developer" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">Company Name</Form.Label>
                                    <Form.Control required value={jobData.companyName} onChange={(e) => setJobData({ ...jobData, companyName: e.target.value })} placeholder="e.g. Acme Corp" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">Location</Form.Label>
                                    <Form.Control required value={jobData.location} onChange={(e) => setJobData({ ...jobData, location: e.target.value })} placeholder="e.g. Remote / New York" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">Job Type</Form.Label>
                                    <Form.Select value={jobData.jobType} onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}>
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">Vacancy</Form.Label>
                                    <Form.Control type="number" min="1" required value={jobData.vacancy} onChange={(e) => setJobData({ ...jobData, vacancy: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">Status</Form.Label>
                                    <Form.Select value={jobData.status} onChange={(e) => setJobData({ ...jobData, status: e.target.value })}>
                                        <option value="OPEN">Open</option>
                                        <option value="FILLED">Filled</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-medium">Description</Form.Label>
                            <Form.Control as="textarea" rows={5} required value={jobData.description} onChange={(e) => setJobData({ ...jobData, description: e.target.value })} placeholder="Detailed job description..." />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium">Skills Required (comma separated)</Form.Label>
                            <Form.Control required value={jobData.skillsRequired} onChange={(e) => setJobData({ ...jobData, skillsRequired: e.target.value })} placeholder="e.g. Java, React, SQL" />
                        </Form.Group>
                        <div className="text-end">
                            <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button type="submit" variant="primary" className="px-4">{isEditMode ? 'Save Changes' : 'Post Job'}</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default RecruiterDashboard;
