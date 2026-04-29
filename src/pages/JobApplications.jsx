import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Alert, Card, Breadcrumb } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const JobApplications = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const fetchApplications = async () => {
        try {
            const res = await api.get(`/applications/job/${jobId}`);
            setApplications(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (appId, status) => {
        try {
            await api.put(`/applications/${appId}/status?status=${status}`);
            setMsg('Status updated successfully');
            fetchApplications();
            setTimeout(() => setMsg(''), 3000);
        } catch (err) {
            alert('Failed to update status');
        }
    };

    // Resume download logic same as before...
    const viewResume = async (path) => {
        if (!path) {
            alert("No resume uploaded");
            return;
        }
        try {
            const filename = path.split('_').pop();
            const response = await api.get(`/users/resume/${path}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            alert("Failed to download resume");
        }
    }

    return (
        <Container className="py-5">
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/recruiter-dashboard" }}>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Applicants</Breadcrumb.Item>
            </Breadcrumb>

            <h2 className="mb-4 fw-bold">Applicants Review</h2>
            {msg && <Alert variant="success">{msg}</Alert>}

            <Card className="border-0 shadow-sm overflow-hidden">
                <Table responsive hover className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-4 border-0">Candidate</th>
                            <th className="py-3 border-0">Contact</th>
                            <th className="py-3 border-0">Applied On</th>
                            <th className="py-3 border-0">Resume</th>
                            <th className="py-3 border-0">Status</th>
                            <th className="py-3 pe-4 border-0 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? applications.map(app => (
                            <tr key={app.id}>
                                <td className="ps-4 fw-medium">{app.seekerName}</td>
                                <td><a href={`mailto:${app.seekerEmail}`} className="text-decoration-none">{app.seekerEmail}</a></td>
                                <td className="text-muted">{new Date(app.appliedDate).toLocaleDateString()}</td>
                                <td>
                                    {app.resumePath ? (
                                        <Button variant="outline-primary" size="sm" className="rounded-pill px-3" onClick={() => viewResume(app.resumePath)}>
                                            ⬇ Download
                                        </Button>
                                    ) : (
                                        <span className="text-muted small">Not provided</span>
                                    )}
                                </td>
                                <td>
                                    <Badge bg={
                                        app.status === 'ACCEPTED' ? 'success' :
                                            app.status === 'REJECTED' ? 'danger' : 'warning'
                                    } className="px-3 py-2 fw-normal">
                                        {app.status}
                                    </Badge>
                                </td>
                                <td className="pe-4 text-end">
                                    <div className="d-flex justify-content-end gap-2">
                                        {app.status !== 'ACCEPTED' && (
                                            <Button variant="success" size="sm" className="rounded-pill px-3" onClick={() => updateStatus(app.id, 'ACCEPTED')}>Accept</Button>
                                        )}
                                        {app.status !== 'REJECTED' && (
                                            <Button variant="outline-danger" size="sm" className="rounded-pill px-3" onClick={() => updateStatus(app.id, 'REJECTED')}>Reject</Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" className="text-center py-5 text-muted">No applicants found for this job yet.</td></tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default JobApplications;
