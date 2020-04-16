import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import classes from './Button.module.scss';

const Button = (props) => {
	const classNames = classnames(classes.button, classes[props.size], {
		[classes[props.type]]: props.type,
		[classes[props.type]]: props.type,
	});

	if (props.href) {
		return (
			<a className={classNames} href={props.href}>
				{props.children}
			</a>
		);
	}
	if (props.to) {
		return (
			<Link to={props.to} exact={props.exact} className={classNames}>
				{props.children}
			</Link>
		);
	}
	return (
		<button
			className={classNames}
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
