const API =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://place-share-mern.herokuapp.com/api';

export const API_STATIC_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000'
		: 'https://place-share-mern.herokuapp.com';

export const SIGN_UP_API = `${API}/users/sign-up`;
export const SIGN_IN_API = `${API}/users/sign-in`;
export const SIGN_OUT_API = `${API}/users/sign-out`;

export const CHECK_USER_API = `${API}/users/check-user`;

export const ADD_NEW_PLACE_API = `${API}/places`;
export const GET_OR_EDIT_PLACE_API = (id) => `${API}/places/${id}`;

export const GET_USERS_PLACES_API = (id) => `${API}/places/user/${id}`;

export const GET_USERS_API = `${API}/users`;
