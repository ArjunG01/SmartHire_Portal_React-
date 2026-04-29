import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Spinner, Alert, Row, Col, Badge, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [msg, setMsg] = useState({ type: '', text: '' });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const res = await api.get(`/jobs/${id}`);
            setJob(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleApplyClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.role !== 'JOB_SEEKER') {
            setMsg({ type: 'danger', text: 'Recruiters cannot apply to jobs.' });
            return;
        }
        setShowApplyModal(true);
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        if (!resumeFile) {
            alert("Please select a resume file.");
            return;
        }

        const formData = new FormData();
        formData.append('resume', resumeFile);

        try {
            await api.post(`/applications/${id}/apply`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setShowApplyModal(false);
            setMsg({ type: 'success', text: 'Application submitted successfully! Good luck!' });
        } catch (err) {
            console.error(err);
            setMsg({ type: 'danger', text: err.response?.data || 'Failed to apply' });
            setShowApplyModal(false);
        }
    };

    if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><Spinner animation="border" variant="primary" /></div>;
    if (!job) return <Container className="py-5 text-center"><h2>Job not found</h2></Container>;

    return (
        <div style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 76px)' }} className="py-5">
            <Container>
                {msg.text && <Alert variant={msg.type} className="mb-4 text-center fw-medium">{msg.text}</Alert>}

                <Row className="justify-content-center">
                    <Col md={10}>
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <div className="bg-primary text-white p-5 text-center" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)' }}>
                                <h1 className="fw-bold mb-2">{job.title}</h1>
                                <p className="lead opacity-75 mb-0">{job.companyName} • {job.location}</p>
                            </div>
                            <Card.Body className="p-5">
                                <div className="d-flex justify-content-center gap-3 mb-5">
                                    <Badge bg="light" text="dark" className="border px-3 py-2 fs-6 fw-normal">📅 Posted {new Date(job.postedDate).toLocaleDateString()}</Badge>
                                    <Badge bg="light" text="dark" className="border px-3 py-2 fs-6 fw-normal">💼 {job.jobType}</Badge>
                                </div>

                                <h4 className="fw-bold mb-3 text-primary-custom">Job Description</h4>
                                <Card.Text className="mb-5 text-muted" style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
                                    {job.description}
                                </Card.Text>

                                <h4 className="fw-bold mb-3 text-primary-custom">Skills Required</h4>
                                <div className="mb-5">
                                    {job.skillsRequired && job.skillsRequired.split(',').map((skill, idx) => (
                                        <Badge key={idx} bg="secondary" className="me-2 mb-2 px-3 py-2 fw-normal fs-6">{skill.trim()}</Badge>
                                    ))}
                                </div>

                                <div className="text-center border-top pt-5">
                                    {user && user.role === 'JOB_SEEKER' ? (
                                        <Button variant="primary" size="lg" className="px-5 rounded-pill shadow-sm" onClick={handleApplyClick}>
                                            🚀 Apply for this Job
                                        </Button>
                                    ) : !user ? (
                                        <Button variant="outline-primary" size="lg" className="px-5 rounded-pill" onClick={() => navigate('/login')}>
                                            Login to Apply
                                        </Button>
                                    ) : (
                                        <Button variant="secondary" size="lg" disabled className="px-5 rounded-pill opacity-50">
                                            Recruiters View Only
                                        </Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Apply Modal */}
            <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Apply for {job.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={handleApplySubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium">Upload Resume (PDF)</Form.Label>
                            <Form.Control
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setResumeFile(e.target.files[0])}
                                required
                            />
                            <Form.Text className="text-muted">
                                Please upload your resume specifically for this job application.
                            </Form.Text>
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => setShowApplyModal(false)}>Cancel</Button>
                            <Button variant="primary" type="submit">Submit Application</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default JobDetails;
