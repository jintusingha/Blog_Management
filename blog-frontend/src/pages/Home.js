
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBlogs, deleteBlog } from '../services/api';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs()
            .then((res) => setBlogs(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this blog?')) {
            deleteBlog(id)
                .then(() => setBlogs(blogs.filter((blog) => blog.id !== id)))
                .catch((err) => console.error(err));
        }
    };

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">Blog Management</h1>
                <Button variant="success" onClick={() => navigate('/add-blog')}>
                    Add New Blog
                </Button>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
                {blogs.map((blog) => (
                    <Col key={blog.id}>
                        <Card className="h-100 shadow-sm blog-card">
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text className="text-muted truncate">
                                    {blog.content.substring(0, 100)}...
                                </Card.Text>
                                <Card.Subtitle className="mb-3 text-muted">
                                    By: {blog.author}
                                </Card.Subtitle>
                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="outline-primary"
                                        onClick={() => navigate(`/edit-blog/${blog.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="outline-danger"
                                        onClick={() => handleDelete(blog.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;