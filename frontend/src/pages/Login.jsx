import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card className="auth-card p-0">
                            <div className="auth-header">
                                <h3 className="mb-0">Welcome Back</h3>
                                <p className="mb-0 opacity-75">Login to your account</p>
                            </div>
                            <Card.Body className="p-4">
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="username" className="mb-3">
                                        <Form.Label className="fw-medium">Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                        />
                                    </Form.Group>
                                    <Form.Group id="password" className="mb-4">
                                        <Form.Label className="fw-medium">Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                        />
                                    </Form.Group>
                                    <Button className="w-100 btn-primary mb-3" size="lg" type="submit">Login</Button>
                                </Form>
                                <div className="text-center mt-3">
                                    <span className="text-muted">Don't have an account? </span>
                                    <Link to="/register" className="fw-bold text-primary-custom text-decoration-none">Sign Up</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
