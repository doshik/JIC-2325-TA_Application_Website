import * as React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const StudentDashboard = () => {
    return (
        <Card 
            bg = {'Dark'}
            text-center style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>CS 3790</Card.Title>
            <Button variant="primary">View Application</Button>
          </Card.Body>
        </Card>
    );
};

export default StudentDashboard;