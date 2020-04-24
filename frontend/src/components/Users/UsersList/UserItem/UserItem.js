import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../common/Card/Card';
import Avatar from '../../Avatar/Avatar';
import classes from './UserItem.module.scss';

const UserItem = ({ user }) => (
	<li className={classes.container}>
		<Card className={classes.wrapper}>
			<Link className={classes.userContainer} to={`/${user._id}/places`}>
				<Avatar img={user.image} className={classes.userImage} />
				<div className={classes.userInfo}>
					<h2 className={classes.userName}>{user.name}</h2>
				</div>
			</Link>
		</Card>
	</li>
);

export default UserItem;
