import React from 'react';
import classnames from 'classnames';

import classes from './Avatar.module.scss';

const Avatar = (props) => (
	<div className={classnames(classes.container, props.className)}>
		<img className={classes.avatar} src={props.img} alt='Avatar' />
	</div>
);

export default Avatar;
