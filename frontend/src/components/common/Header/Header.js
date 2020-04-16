import React from 'react';
import { Link } from 'react-router-dom';

import NavLinks from '../Navigation/NavLinks/NavLinks';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Header.module.scss';

const Header = () => (
	<>
		<SideDrawer>
			<nav className={classes.sideDrawer}>
				<NavLinks />
			</nav>
		</SideDrawer>
		<header className={classes.container}>
			<button className={classes.menuBtn}>
				<span />
				<span />
				<span />
			</button>
			<h1 className={classes.title}>
				<Link to='/'>PlaceShare</Link>
			</h1>
			<nav className={classes.navigation}>
				<NavLinks />
			</nav>
		</header>
	</>
);

export default Header;
