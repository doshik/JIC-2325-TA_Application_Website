import * as React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProfDashboard = () => {
    return (
        <Card 
            bg = {'Dark'}
            text-center style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>CS1336</Card.Title>
            <Button variant="primary">View Applicants</Button>
          </Card.Body>
        </Card>
    );
};

export default ProfDashboard;