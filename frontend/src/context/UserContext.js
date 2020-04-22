import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { SIGN_UP_API, SIGN_IN_API } from '../const/api';
import { HOME_URL, SIGN_IN_URL, SIGN_UP_URL } from '../const/urls';
import { postRequest } from '../util/fetch';

export const UserContext = createContext({
	user: null,
	setUser: () => {},
	signUp: () => {},
	signIn: () => {},
	signOut: () => {},
});

export const UserContextProvider = (props) => {
	const [user, setUser] = useState(null);
	const history = useHistory();

	useEffect(() => {
		const { pathname } = history.location;

		if ((pathname === SIGN_IN_URL || pathname === SIGN_UP_URL) && user) {
			history.push(HOME_URL);
		}
	}, [history, user]);

	const signUp = async (data) => await postRequest(SIGN_UP_API, data);

	const signIn = async (data) => await postRequest(SIGN_IN_API, data);

	const signOut = () => setUser(null);

	return (
		<UserContext.Provider value={{ user, signIn, signOut, signUp, setUser }}>
			{props.children}
		</UserContext.Provider>
	);
};
