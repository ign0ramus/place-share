import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import classes from './SideDrawer.module.scss';

const SideDrawer = (props) =>
	ReactDOM.createPortal(
		<CSSTransition
			in={props.isOpen}
			timeout={200}
			classNames={{
				enter: classes.slideInLeftEnter,
				enterActive: classes.slideInLeftEnterActive,
				exit: classes.slideInLeftExit,
				exitActive: classes.slideInLeftExitActive,
			}}
			mountOnEnter
			unmountOnExit
		>
			<aside onClick={props.onClose} className={classes.container}>
				{props.children}
			</aside>
		</CSSTransition>,
		document.getElementById('drawer-hook')
	);

export default SideDrawer;
