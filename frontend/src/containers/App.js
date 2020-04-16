import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import Header from '../components/common/Header/Header';

const App = () => (
	<Router>
		<Header />
		<main>
			<Routes />
		</main>
	</Router>
);

export default App;
