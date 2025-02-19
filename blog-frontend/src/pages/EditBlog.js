
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogById, updateBlog } from '../services/api';
import { Button, Form, Container, Spinner } from 'react-bootstrap';

const EditBlog = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: ''
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogById(id)
            .then((res) => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBlog(id, formData)
            .then(() => navigate('/'))
            .catch((err) => console.error(err));
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    if(loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="form-container">
            <h2 className="mb-4 text-center">Edit Blog Post</h2>
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
                        Update Blog
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

export default EditBlog;