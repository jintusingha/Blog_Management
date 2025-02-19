
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000', 
});

export const fetchBlogs = () => api.get('/blogs');
export const fetchBlogById = (id) => api.get(`/blogs/${id}`);
export const addBlog = (blog) => api.post('/blogs', blog);
export const updateBlog = (id, blog) => api.put(`/blogs/${id}`, blog);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

export default api;
