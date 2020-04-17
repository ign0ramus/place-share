import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../../../context/UserContext';
import classes from './NavLinks.module.scss';

const NavLinks = () => {
	const userContext = useContext(UserContext);
	const isUserSignIn = Boolean(userContext.user);

	return (
		<ul className={classes.container}>
			<li>
				<NavLink activeClassName={classes.active} to='/' exact>
					All users
				</NavLink>
			</li>
			{isUserSignIn && (
				<>
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
						<button onClick={userContext.signOut}>
							Sign out
						</button>
					</li>
				</>
			)}
			{!isUserSignIn && (
				<>
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
				</>
			)}
		</ul>
	);
};

export default NavLinks;
