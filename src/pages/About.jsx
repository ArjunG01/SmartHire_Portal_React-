import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
    return (
        <div style={{ background: '#f8f9fa' }}>
            {/* Hero */}
            <div className="bg-primary text-white py-5 mb-5" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
                <Container className="text-center py-5">
                    <h1 className="display-4 fw-bold mb-3">About SmartHire</h1>
                    <p className="lead opacity-75 mx-auto" style={{ maxWidth: '700px' }}>Connection talent with opportunity. We are reshaping the way the world hires and gets hired.</p>
                </Container>
            </div>

            <Container className="mb-5">
                <Row className="mb-5 align-items-center">
                    <Col md={6}>
                        <h2 className="fw-bold mb-4">Our Mission</h2>
                        <p className="lead text-muted">
                            At SmartHire, we believe that everyone deserves a job they love. Our mission is to make the hiring process as simple, transparent, and effective as possible for both job seekers and recruiters.
                        </p>
                        <p className="text-muted">
                            We leverage cutting-edge technology to match the right candidates with the right companies, ensuring a perfect fit every time. Whether you're a startup looking for your first engineer or a fresh graduate seeking your first break, SmartHire is here to help.
                        </p>
                    </Col>
                    <Col md={6}>
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Team working" className="img-fluid rounded-4 shadow-lg" />
                    </Col>
                </Row>

                <Row className="text-center mb-5">
                    <Col md={4} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm p-4">
                            <div className="display-4 text-primary mb-3">🚀</div>
                            <Card.Title className="fw-bold">Fast & Efficient</Card.Title>
                            <Card.Text className="text-muted">Our simplified application process means you can apply to jobs in seconds, not hours.</Card.Text>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm p-4">
                            <div className="display-4 text-primary mb-3">🛡️</div>
                            <Card.Title className="fw-bold">Secure & Private</Card.Title>
                            <Card.Text className="text-muted">We take your data privacy seriously. Your personal information is safe with us.</Card.Text>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm p-4">
                            <div className="display-4 text-primary mb-3">🌍</div>
                            <Card.Title className="fw-bold">Global Reach</Card.Title>
                            <Card.Text className="text-muted">Find opportunities around the corner or across the globe. The world is your office.</Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default About;
