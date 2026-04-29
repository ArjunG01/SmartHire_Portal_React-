import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/jobs/public').then(res => {
            setFeaturedJobs(res.data.slice(0, 6)); // Show 6 jobs
        }).catch(err => console.error(err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/jobs?keyword=${keyword}`);
    };

    const categories = [
        { name: 'Engineering', icon: '💻', count: '1.2k Jobs' },
        { name: 'Marketing', icon: '📢', count: '800 Jobs' },
        { name: 'Design', icon: '🎨', count: '500 Jobs' },
        { name: 'Finance', icon: '💰', count: '300 Jobs' },
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="hero-section mb-5 d-flex align-items-center" style={{ minHeight: '600px', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col md={9}>
                            <h1 className="display-4 fw-bold mb-4 text-white">Find the Job That Fits Your Life</h1>
                            <p className="lead mb-5 text-white opacity-75">Millions of people are searching for jobs, salary information, company reviews, and interview questions.</p>

                            <Card className="p-2 border-0 shadow-lg rounded-pill" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
                                <Card.Body className="p-2">
                                    <Form onSubmit={handleSearch}>
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <Form.Control
                                                size="lg"
                                                placeholder="Job title, keywords, or company"
                                                className="border-0 rounded-pill"
                                                style={{ minHeight: '55px' }}
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                            />
                                            <Button type="submit" variant="warning" size="lg" className="px-5 rounded-pill fw-bold text-dark">
                                                Search Jobs
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <div className="mt-4 text-white opacity-75 small">
                                <strong>Popular Searches:</strong> Java, React, Manager, Remote
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Categories */}
            <Container className="mb-5 py-4">
                <h3 className="fw-bold mb-4 text-center">Explore by Category</h3>
                <Row className="justify-content-center">
                    {categories.map((cat, idx) => (
                        <Col md={3} xs={6} key={idx} className="mb-3">
                            <Card className="text-center h-100 border-0 shadow-sm hover-lift" style={{ background: '#f8f9fa' }}>
                                <Card.Body className="py-4">
                                    <div className="display-4 mb-2">{cat.icon}</div>
                                    <h5 className="fw-bold">{cat.name}</h5>
                                    <span className="text-muted small">{cat.count}</span>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Featured Jobs */}
            <div className="bg-light py-5">
                <Container>
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <h2 className="fw-bold">Latest Job Openings</h2>
                        <Link to="/jobs" className="btn btn-outline-primary rounded-pill px-4">See All Jobs</Link>
                    </div>

                    <Row>
                        {featuredJobs.map(job => (
                            <Col md={6} lg={4} key={job.id} className="mb-4">
                                <Card className="h-100 border-0 shadow-sm card-hover">
                                    <Card.Body className="p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="rounded p-2 bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                <span className="fs-4">🏢</span>
                                            </div>
                                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle align-self-start">{job.jobType}</span>
                                        </div>
                                        <h5 className="card-title fw-bold text-dark">{job.title}</h5>
                                        <p className="text-muted small mb-2">{job.companyName}</p>
                                        <p className="text-muted small mb-3">📍 {job.location}</p>

                                        <div className="mt-auto pt-3 border-top">
                                            <Link to={`/jobs/${job.id}`} className="fw-bold text-decoration-none text-primary">
                                                View Details &rarr;
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            {/* Stats / CTA */}
            <Container className="py-5 text-center">
                <h2 className="fw-bold mb-5">Trusted by leading companies</h2>
                <Row className="justify-content-center mb-5 grayscale-logos opacity-50">
                    <Col xs={4} md={2} className="mb-3"><h3>Google</h3></Col>
                    <Col xs={4} md={2} className="mb-3"><h3>Microsoft</h3></Col>
                    <Col xs={4} md={2} className="mb-3"><h3>Amazon</h3></Col>
                    <Col xs={4} md={2} className="mb-3"><h3>Spotify</h3></Col>
                    <Col xs={4} md={2} className="mb-3"><h3>Netflix</h3></Col>
                </Row>

                <Card className="bg-dark text-white rounded-4 overflow-hidden p-5 text-center">
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <h2 className="display-6 fw-bold mb-3">Ready to start your career?</h2>
                            <p className="lead opacity-75 mb-4">Join thousands of job seekers and find your dream job today.</p>
                            <Link to="/register">
                                <Button variant="primary" size="lg" className="px-5 rounded-pill">Create Account</Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    );
};

export default Home;
