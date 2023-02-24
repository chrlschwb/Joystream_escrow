import React, { useState } from 'react';
import { Col, Row, Card, InputGroup, Form, Button, Table } from 'react-bootstrap';

function Landing() {
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});
	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	return (
		<div className="container">
			<div className="dark-overlay">
				<h1 className="text-white text-center" style={{ marginTop: '20%' }}>
					Start Escrow
				</h1>
				{/* <h1 className="x-large">Start Escrown</h1> */}
				<h3 className="text-center text-white-50">Create Escrow project</h3>
			</div>
		</div>
	);
}

export default Landing;
