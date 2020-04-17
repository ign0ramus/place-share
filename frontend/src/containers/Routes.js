import React, { lazy, Suspense } from 'react';
import {
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

const Users = lazy(() => import('./Users'));
const EditPlace = lazy(() => import('./EditPlace'));
const Places = lazy(() => import('./Places'));
const NewPlace = lazy(() => import('./NewPlace'));

const Routes = () => {
	return (
		<Suspense fallback={'Loading...'}>
			<Switch>
				<Route path='/' exact component={Users} />

				<Route path='/:userId/places' exact component={Places} />

				<Route path='/places/new' exact component={NewPlace} />
				<Route path='/places/:placeId' component={EditPlace} />

				<Redirect to='/' />
			</Switch>
		</Suspense>
	);
};

export default Routes;
