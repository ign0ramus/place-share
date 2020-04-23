import React from 'react';
import classnames from 'classnames';

import classes from './Spinner.module.scss';

const Spinner = (props) => {
	return (
		<div className={classnames({ [classes.overlay]: props.asOverlay })}>
			<div className={classes.spinner}></div>
		</div>
	);
};

export default Spinner;
