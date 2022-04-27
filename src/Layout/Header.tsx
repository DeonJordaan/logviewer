import classes from './Header.module.css';

const Header: React.FC = () => {
	return (
		<header className={classes.header}>
			<img
				src="../logo-placeholder.png"
				className={classes.logo}
				alt="logo"
			/>
			<p>Log Viewer</p>
		</header>
	);
};

export default Header;
