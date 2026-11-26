import React from 'react';
import { Link } from 'react-router-dom';
import ThreeDButton from '../components/ThreeDButton';

export default function NotFoundPage() {
  return (
    <div className="page notfound-page" style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 – Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/dashboard">
        <ThreeDButton>Go to Dashboard</ThreeDButton>
      </Link>
    </div>
  );
}
