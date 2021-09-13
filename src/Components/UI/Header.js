import classes from './Header.module.css';

const Header = () => {
	return (
		<div>
			<header className="header">
				<img
					src="../logo-lexisnexis.png"
					className={classes.logo}
					alt="logo"
				/>
				<p>Log Viewer</p>
			</header>
		</div>
	);
};

export default Header;
