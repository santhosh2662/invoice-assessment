import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import InvoiceFormPage from './components/InvoiceFormPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/invoice-form" element={<InvoiceFormPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;