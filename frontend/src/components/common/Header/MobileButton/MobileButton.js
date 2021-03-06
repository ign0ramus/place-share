import React from 'react';

import classes from './MobileButton.module.scss';

const MobileButton = (props) => (
	<button onClick={props.onClick} className={classes.btn}>
		<span />
		<span />
		<span />
	</button>
);

export default MobileButton;
