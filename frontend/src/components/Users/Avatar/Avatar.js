import React from 'react';
import classnames from 'classnames';

import { API_STATIC_URL } from '../../../const/api';
import classes from './Avatar.module.scss';

const Avatar = (props) => (
	<div className={classnames(classes.container, props.className)}>
		<img
			className={classes.avatar}
			src={`${API_STATIC_URL}/${props.img}`}
			alt='Avatar'
		/>
	</div>
);

export default Avatar;
