import classes from './Header.module.css';

const Header = () => {
	return (
		// <div>
		<header className={classes.header}>
			<img
				src="../logo-placeholder.png"
				className={classes.logo}
				alt="logo"
			/>
			<p>Log Viewer</p>
		</header>
		// </div>
	);
};

export default Header;
