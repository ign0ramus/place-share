import React from 'react';

import UserItem from './UserItem/UserItem';
import Card from '../../common/Card/Card';
import classes from './UsersList.module.scss';

const UsersList = ({users}) => (
	<div className={classes.container}>
		{!users.length ? (
			<Card>
				<h2 className={classes.empty}>No users found!</h2>
			</Card>
		) : (
			<ul className={classes.usersList}>
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</ul>
		)}
	</div>
);

export default UsersList;
