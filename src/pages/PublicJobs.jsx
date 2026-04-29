import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, InputGroup } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';

const PublicJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        location: '',
        type: []
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get('/jobs/public');
            setJobs(res.data);
            applyFilters(res.data, filters);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // Re-apply filters when filters state changes
        applyFilters(jobs, filters);
    }, [filters, jobs]);

    const applyFilters = (allJobs, currentFilters) => {
        let temp = [...allJobs];

        if (currentFilters.keyword) {
            const k = currentFilters.keyword.toLowerCase();
            temp = temp.filter(j =>
                j.title.toLowerCase().includes(k) ||
                j.companyName.toLowerCase().includes(k) ||
                j.skillsRequired.toLowerCase().includes(k)
            );
        }

        if (currentFilters.location) {
            const l = currentFilters.location.toLowerCase();
            temp = temp.filter(j => j.location.toLowerCase().includes(l));
        }

        if (currentFilters.type.length > 0) {
            temp = temp.filter(j => currentFilters.type.includes(j.jobType));
        }

        setFilteredJobs(temp);
    };

    const handleTypeChange = (e) => {
        const { value, checked } = e.target;
        let newTypes = [...filters.type];
        if (checked) newTypes.push(value);
        else newTypes = newTypes.filter(t => t !== value);
        setFilters({ ...filters, type: newTypes });
    };

    return (
        <div style={{ background: '#f3f4f6', minHeight: '100vh' }} className="py-5">
            <Container>
                <div className="mb-4">
                    <h2 className="fw-bold">Find your next role</h2>
                    <p className="text-muted">Browse {filteredJobs.length} open positions</p>
                </div>

                <Row>
                    {/* Sidebar Filters */}
                    <Col md={3}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Body>
                                <h5 className="fw-bold mb-3">Filters</h5>

                                <div className="mb-4">
                                    <label className="form-label fw-medium small">Search</label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Job title, keywords"
                                        value={filters.keyword}
                                        onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                                        className="mb-2"
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="City, state, or zip"
                                        value={filters.location}
                                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-medium small">Job Type</label>
                                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                                        <Form.Check
                                            key={type}
                                            type="checkbox"
                                            label={type}
                                            value={type}
                                            onChange={handleTypeChange}
                                            id={`type-${type}`}
                                            className="mb-2"
                                        />
                                    ))}
                                </div>
                                <Button variant="outline-secondary" className="w-100 btn-sm" onClick={() => setFilters({ keyword: '', location: '', type: [] })}>
                                    Reset Filters
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Job List */}
                    <Col md={9}>
                        {filteredJobs.length > 0 ? filteredJobs.map(job => (
                            <Card key={job.id} className="border-0 shadow-sm mb-3 hover-shadow transition-all">
                                <Card.Body className="p-4">
                                    <Row>
                                        <Col md={1} className="d-none d-md-block">
                                            <div className="rounded bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                                                🏢
                                            </div>
                                        </Col>
                                        <Col md={8}>
                                            <h5 className="fw-bold text-primary mb-1">
                                                <Link to={`/jobs/${job.id}`} className="text-decoration-none">{job.title}</Link>
                                            </h5>
                                            <div className="mb-2">
                                                <span className="text-dark fw-medium">{job.companyName}</span>
                                                <span className="mx-2 text-muted">•</span>
                                                <span className="text-muted">{job.location}</span>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <Badge bg="light" text="dark" className="border fw-normal">{job.jobType}</Badge>
                                                <small className="text-muted align-self-center">Posted {new Date(job.postedDate).toLocaleDateString()}</small>
                                            </div>
                                        </Col>
                                        <Col md={3} className="text-end d-flex flex-column justify-content-center">
                                            <Link to={`/jobs/${job.id}`}>
                                                <Button variant="outline-primary" className="w-100 rounded-pill fw-medium">View Details</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )) : (
                            <Card className="border-0 shadow-sm text-center py-5">
                                <Card.Body>
                                    <h3>No jobs found</h3>
                                    <p className="text-muted">Try adjusting your filters.</p>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PublicJobs;
