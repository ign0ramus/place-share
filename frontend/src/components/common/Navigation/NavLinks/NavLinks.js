import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavLinks.module.scss';

const NavLinks = () => (
	<ul className={classes.container}>
		<li>
			<NavLink activeClassName={classes.active} to='/' exact>
				All users
			</NavLink>
		</li>
		<li>
			<NavLink activeClassName={classes.active} to='/1id/places'>
				My places
			</NavLink>
		</li>
		<li>
			<NavLink activeClassName={classes.active} to='/places/new'>
				Add place
			</NavLink>
		</li>
		<li>
			<NavLink activeClassName={classes.active} to='/sign-in'>
				Sign in
			</NavLink>
		</li>
		<li>
			<NavLink activeClassName={classes.active} to='/sign-up'>
				Sign up
			</NavLink>
		</li>
	</ul>
);

export default NavLinks;
