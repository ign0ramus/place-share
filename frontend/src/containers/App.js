import React, { lazy, Suspense } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

import './App.css';

const Users = lazy(() => import('./Users'));

const Places = lazy(() => import('./Places'));
const NewPlace = lazy(() => import('./NewPlace'));

const App = () => {
	return (
		<Router>
			<Suspense fallback={'Loading...'}>
				<Switch>
					<Route path='/' exact component={Users} />

					<Route path='/places' exact component={Places} />
					<Route path='/places/new' exact component={NewPlace} />

					<Redirect to='/' />
				</Switch>
			</Suspense>
		</Router>
	);
};

export default App;
