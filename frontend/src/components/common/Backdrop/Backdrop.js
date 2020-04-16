import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Backdrop.module.scss';

const Backdrop = (props) =>
	ReactDOM.createPortal(
		<div onClick={props.onClick} className={classes.backdrop}></div>,
		document.getElementById('backdrop-hook')
	);

export default Backdrop;
