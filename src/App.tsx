import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

/**
 * Main App Component
 * Sets up routing and main layout structure
 * 
 * Routes:
 * - / : Home page
 * - /login : Login page
 * - /register : Registration page
 */
console.log('App component loaded');

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

