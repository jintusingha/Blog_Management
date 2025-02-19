
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBlog } from '../services/api';
import { Button, Form, Container } from 'react-bootstrap';

const AddBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addBlog(formData)
            .then(() => navigate('/'))
            .catch((err) => console.error(err));
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <Container className="form-container">
            <h2 className="mb-4 text-center">Create New Blog</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                        Publish Blog
                    </Button>
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AddBlog;