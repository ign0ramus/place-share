import React, { lazy, Suspense, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));
const Users = lazy(() => import('./Users'));

const EditPlace = lazy(() => import('./EditPlace'));
const Places = lazy(() => import('./Places'));
const NewPlace = lazy(() => import('./NewPlace'));

const Routes = () => {
	const userContext = useContext(UserContext);
	return (
		<Suspense fallback={'Loading...'}>
			{userContext.user ? (
				<Switch>
					<Route path='/' exact component={Users} />
					<Route path='/:userId/places' exact component={Places} />
					<Route path='/places/new' exact component={NewPlace} />
					<Route path='/places/:placeId' component={EditPlace} />
					<Redirect to='/' />
				</Switch>
			) : (
				<Switch>
					<Route path='/' exact component={Users} />
					<Route path='/:userId/places' exact component={Places} />
					<Route path='/sign-in' exact component={SignIn} />
					<Route path='/sign-up' exact component={SignUp} />
					<Redirect to='/sign-in' />
				</Switch>
			)}
		</Suspense>
	);
};

export default Routes;
