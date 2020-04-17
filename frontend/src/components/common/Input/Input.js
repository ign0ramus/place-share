import React from 'react';
import classnames from 'classnames';

import classes from './Input.module.scss';

const Input = (props) => (
	<div
		className={classnames(classes.formControl, props.className, {
			[classes.invalid]: props.error,
		})}
	>
		<label htmlFor={props.id}>{props.id}</label>
		{props.element === 'input' ? (
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				onChange={props.onChange}
				value={props.value}
			/>
		) : (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				onChange={props.onChange}
				value={props.value}
			/>
		)}
		{props.error && <span>{props.error}</span>}
	</div>
);

export default Input;
