import { Moon, SunDim } from 'phosphor-react';

import classes from './Header.module.css';

const Header: React.FC<{
	theme: string;
	switchTheme: () => void;
}> = (props) => {
	const theme = props.theme;
	let themeContent = <SunDim onClick={props.switchTheme} size={28} />;

	if (theme === 'light') {
		themeContent = <Moon onClick={props.switchTheme} size={28} />;
	}

	return (
		<header className={classes.header}>
			<img
				src="../logo-placeholder.png"
				className={classes.logo}
				alt="logo"
			/>
			<div className={classes['header-right']}>
				<p>Log Viewer</p>
				<span className={classes.lightbulb}>
					{themeContent}
					{/* <LightbulbFilament onClick={props.switchTheme} size={28} /> */}
				</span>
			</div>
		</header>
	);
};

export default Header;
