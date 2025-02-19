// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-blog" element={<AddBlog />} />
                <Route path="/edit-blog/:id" element={<EditBlog />} />
            </Routes>
        </Router>
    );
}

export default App;
