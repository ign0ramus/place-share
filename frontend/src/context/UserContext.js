import React, { createContext, useState } from 'react';

export const UserContext = createContext({
	user: null,
	signIn: () => {},
	signOut: () => {},
});

export const UserContextProvider = (props) => {
	const [user, setUser] = useState(null);

	const signIn = () => {
		console.log('SIGN IN');
		setUser({});
	};

	const signOut = () => {
		console.log('SIGN OUT');
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, signIn, signOut }}>
			{props.children}
		</UserContext.Provider>
	);
};
