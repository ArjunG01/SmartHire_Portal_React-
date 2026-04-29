import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Alert, Badge } from 'react-bootstrap';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const JobSeekerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState({ type: '', text: '' });
    const [resumeName, setResumeName] = useState('');

    useEffect(() => {
        fetchApplications();
        fetchProfile();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await api.get('/applications/my-applications');
            setApplications(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await api.get('/users/profile');
            if (res.data.resumePath) {
                setResumeName(res.data.resumePath.split('_').pop());
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post('/users/upload-resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMsg({ type: 'success', text: 'Resume uploaded successfully!' });
            fetchProfile();
        } catch (err) {
            setMsg({ type: 'danger', text: 'Failed to upload resume.' });
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">My Dashboard</h2>
            {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}

            <Row className="mb-5">
                <Col md={12}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                            <h4 className="fw-bold mb-4 text-primary-custom">Profile & Resume</h4>
                            <Row>
                                <Col md={6}>
                                    <p className="mb-2"><strong className="text-muted">Username:</strong> <span className="fw-medium">{user.username}</span></p>
                                    <p className="mb-4"><strong className="text-muted">Email:</strong> <span className="fw-medium">{user.email}</span></p>

                                    <div className="bg-light p-3 rounded mb-3">
                                        <div className="d-flex align-items-center">
                                            <span className="fs-3 me-3">📄</span>
                                            <div>
                                                <small className="text-muted d-block">Current Resume</small>
                                                <strong>{resumeName || 'No resume uploaded'}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="border rounded p-4 h-100">
                                        <h6 className="fw-bold mb-3">Update Resume</h6>
                                        <Form onSubmit={handleUpload}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small text-muted">Select PDF file</Form.Label>
                                                <Form.Control type="file" accept="application/pdf" onChange={handleFileChange} />
                                            </Form.Group>
                                            <div className="text-end">
                                                <Button type="submit" variant="primary" disabled={!file}>Upload New Resume</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h4 className="mb-3 fw-bold">Application History</h4>
            <Card className="border-0 shadow-sm overflow-hidden">
                <Table responsive hover className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-4 border-0">Job Title</th>
                            <th className="py-3 border-0">Company</th>
                            <th className="py-3 border-0">Applied Date</th>
                            <th className="py-3 pe-4 border-0 text-end">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? applications.map(app => (
                            <tr key={app.id}>
                                <td className="ps-4 fw-medium">{app.jobTitle}</td>
                                <td className="text-muted">{app.companyName}</td>
                                <td className="text-muted">{new Date(app.appliedDate).toLocaleDateString()}</td>
                                <td className="pe-4 text-end">
                                    <Badge bg={
                                        app.status === 'ACCEPTED' ? 'success' :
                                            app.status === 'REJECTED' ? 'danger' : 'warning'
                                    } className="px-3 py-2 fw-normal">
                                        {app.status}
                                    </Badge>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" className="text-center py-5 text-muted">You haven't applied to any jobs yet.</td></tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default JobSeekerDashboard;
