import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classes from './Header.module.css';

const Header: React.FC<{
	switchTheme: () => void;
}> = (props) => {
	const lightBulb = faLightbulb as IconProp;

	return (
		<header className={classes.header}>
			<img
				src="../logo-placeholder.png"
				className={classes.logo}
				alt="logo"
			/>
			<div className={classes['header-right']}>
				<p>Log Viewer</p>
				<span>
					<FontAwesomeIcon
						onClick={props.switchTheme}
						icon={lightBulb}
						// size="2x"
					/>
				</span>
			</div>
		</header>
	);
};

export default Header;
