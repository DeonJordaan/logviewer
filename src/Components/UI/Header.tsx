import classes from './Header.module.css';

const Header: React.FC<{
	switchTheme: () => void;
}> = (props) => {
	return (
		<header className={classes.header}>
			<img
				src="../logo-placeholder.png"
				className={classes.logo}
				alt="logo"
			/>
			<button onClick={props.switchTheme}>Theme</button>
			<p>Log Viewer</p>
		</header>
	);
};

export default Header;
