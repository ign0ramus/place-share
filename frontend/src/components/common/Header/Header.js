import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MobileButton from './MobileButton/MobileButton';
import NavLinks from '../Navigation/NavLinks/NavLinks';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Header.module.scss';

const Header = () => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const handleOpenDrawer = () => {
		setDrawerIsOpen(true);
	};

	const handleCloseDrawer = () => {
		setDrawerIsOpen(false);
	};

	return (
		<>
			{drawerIsOpen && <Backdrop onClick={handleCloseDrawer} />}
			<SideDrawer isOpen={drawerIsOpen} handleClick={handleCloseDrawer}>
				<nav className={classes.sideDrawer}>
					<NavLinks />
				</nav>
			</SideDrawer>
			<header className={classes.container}>
				<MobileButton handleClick={handleOpenDrawer} />
				<h1 className={classes.title}>
					<Link to='/'>PlaceShare</Link>
				</h1>
				<nav className={classes.navigation}>
					<NavLinks />
				</nav>
			</header>
		</>
	);
};

export default Header;
