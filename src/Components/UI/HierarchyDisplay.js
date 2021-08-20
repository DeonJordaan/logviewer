import React, { useState } from 'react';

import './HierarchyDisplay.css';

const HierarchyDisplay = () => {
	const [Header, setHeader] = useState('Hierarchy Display');

	return (
		<div>
			<h2>{Header}</h2>
		</div>
	);
};

export default HierarchyDisplay;
