import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserContextProvider } from '../context/UserContext';
import Routes from './Routes';
import Header from '../components/common/Header/Header';

const App = () => (
	<Router>
		<UserContextProvider>
			<Header />
			<main>
				<Routes />
			</main>
		</UserContextProvider>
	</Router>
);

export default App;
