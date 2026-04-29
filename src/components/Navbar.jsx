import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavigationBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="white" expand="lg" className="py-3 sticky-top shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center gap-2 text-primary-custom">
                    <span style={{ fontSize: '1.5rem' }}>💼</span> SmartHire
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto fw-medium">
                        <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="mx-2">About</Nav.Link>
                        <Nav.Link as={Link} to="/jobs" className="mx-2">Browse Jobs</Nav.Link>
                        {user && user.role === 'JOB_SEEKER' && (
                            <Nav.Link as={Link} to="/seeker-dashboard" className="mx-2">Dashboard</Nav.Link>
                        )}
                        {user && user.role === 'RECRUITER' && (
                            <Nav.Link as={Link} to="/recruiter-dashboard" className="mx-2">Recruiter Hub</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {user ? (
                            <div className="d-flex align-items-center gap-3">
                                <div className="text-end d-none d-lg-block">
                                    <div className="fw-bold text-dark">{user.username}</div>
                                    <div className="text-muted small" style={{ lineHeight: 1 }}>{user.role === 'JOB_SEEKER' ? 'Job Seeker' : 'Recruiter'}</div>
                                </div>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/login">
                                    <Button variant="outline-primary" className="px-4">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" className="px-4 text-white">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
