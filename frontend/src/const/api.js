const API =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://sheltered-woodland-30586.herokuapp.com';

export const SIGN_UP_API = `${API}/users/sign-up`;
export const SIGN_IN_API = `${API}/users/sign-in`;
export const SIGN_OUT_API = `${API}/users/sign-out`;