import { LightbulbFilament } from 'phosphor-react';

import classes from './Header.module.css';

const Header: React.FC<{
	switchTheme: () => void;
}> = (props) => {
	// const lightBulb = faLightbulb as IconProp;FIXME

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
					<LightbulbFilament onClick={props.switchTheme} size={28} />
				</span>
			</div>
		</header>
	);
};

export default Header;
