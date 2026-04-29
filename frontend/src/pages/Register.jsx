import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'JOB_SEEKER',
        profileSummary: ''
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || 'Failed to register');
        }
    };

    return (
        <div style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="auth-card p-0">
                            <div className="auth-header">
                                <h3 className="mb-0">Create an Account</h3>
                                <p className="mb-0 opacity-75">Join SmartHire today</p>
                            </div>
                            <Card.Body className="p-4">
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-medium">I want to...</Form.Label>
                                                <div className="d-flex gap-2">
                                                    <Form.Check
                                                        type="radio"
                                                        label="Find a Job"
                                                        name="role"
                                                        id="roleSeeker"
                                                        value="JOB_SEEKER"
                                                        checked={formData.role === 'JOB_SEEKER'}
                                                        onChange={handleChange}
                                                        className="border rounded p-3 w-50"
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        label="Hire Talent"
                                                        name="role"
                                                        id="roleRecruiter"
                                                        value="RECRUITER"
                                                        checked={formData.role === 'RECRUITER'}
                                                        onChange={handleChange}
                                                        className="border rounded p-3 w-50"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-medium">Username</Form.Label>
                                        <Form.Control type="text" name="username" required onChange={handleChange} placeholder="Desired username" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-medium">Email Address</Form.Label>
                                        <Form.Control type="email" name="email" required onChange={handleChange} placeholder="name@example.com" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-medium">Password</Form.Label>
                                        <Form.Control type="password" name="password" required onChange={handleChange} placeholder="Strong password" />
                                    </Form.Group>

                                    {formData.role === 'JOB_SEEKER' && (
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-medium">Short Profile Summary</Form.Label>
                                            <Form.Control as="textarea" rows={3} name="profileSummary" onChange={handleChange} placeholder="Briefly describe your skills and experience..." />
                                        </Form.Group>
                                    )}

                                    <Button className="w-100 btn-primary mb-3" size="lg" type="submit">Create Account</Button>
                                </Form>
                                <div className="text-center mt-3">
                                    <span className="text-muted">Already have an account? </span>
                                    <Link to="/login" className="fw-bold text-primary-custom text-decoration-none">Login</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;
