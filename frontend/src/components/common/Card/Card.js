import React from 'react';
import classnames from 'classnames';

import classes from './Card.module.scss';

const Card = (props) => (
	<div className={classnames(classes.card, props.className)}>
		{props.children}
	</div>
);

export default Card;
