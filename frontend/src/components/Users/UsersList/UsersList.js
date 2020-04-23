import React, { useState, useEffect } from 'react';

import { useHttpClient } from '../../../hooks/httpHook';
import { getRequest } from '../../../util/fetch';
import { GET_USERS_API } from '../../../const/api';
import UserItem from './UserItem/UserItem';
import Card from '../../common/Card/Card';
import Spinner from '../../common/Spinner/Spinner';
import classes from './UsersList.module.scss';

const UsersList = () => {
	const [users, setUsers] = useState(null);
	const { isLoading, error, sendRequest } = useHttpClient(
		GET_USERS_API,
		getRequest
	);

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await sendRequest();
			if (!error) {
				setUsers(res.result);
			}
		};

		fetchUsers();
	}, [sendRequest]);

	const renderUsers = () => {
		if (!users && !isLoading) {
			return null;
		}

		if (isLoading) {
			return <Spinner asOverlay />;
		}

		if (error) {
			return <span className={classes.error}>{error}</span>;
		}

		return !users.length ? (
			<Card>
				<h2 className={classes.empty}>No users found!</h2>
			</Card>
		) : (
			<ul className={classes.usersList}>
				{users.map((user) => (
					<UserItem key={user._id} user={user} />
				))}
			</ul>
		);
	};
	return <div className={classes.container}>{renderUsers()}</div>;
};

export default UsersList;
