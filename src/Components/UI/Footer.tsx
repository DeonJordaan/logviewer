import React from 'react';

import classes from './Footer.module.css';

const Footer: React.FC = () => {
	return (
		<footer className={classes.footer}>
			&copy; 2022 by Deon Jordaan -&nbsp;
			<a href="http://deon.dev">www.deon.dev</a>
		</footer>
	);
};

export default Footer;
