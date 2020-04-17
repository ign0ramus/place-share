import React from 'react';

import classes from './Form.module.scss';

const Form = (props) => (
	<form className={classes.container} onSubmit={props.onSubmit}>
		{props.children}
	</form>
);

export default Form;
