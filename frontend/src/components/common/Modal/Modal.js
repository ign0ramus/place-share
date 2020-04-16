import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.scss';

const ModalOverlay = (props) =>
	ReactDOM.createPortal(
		<div
			className={classnames(classes.container, props.className)}
			style={props.style}
		>
			<header className={classnames(classes.header, props.headerClass)}>
				<h2>{props.header}</h2>
			</header>
			<form
				onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
			>
				<div className={classnames(classes.content, props.contentClass)}>
					{props.children}
				</div>
				<footer className={classnames(classes.footer, props.footerClass)}>
					{props.footer}
				</footer>
			</form>
		</div>,
		document.getElementById('modal-hook')
	);

const Modal = (props) => (
	<>
		{props.isOpen && <Backdrop onClick={props.onCancel} />}
		<CSSTransition
			in={props.isOpen}
			timeout={200}
			classNames={{
				enter: classes.modalEnter,
				enterActive: classes.modalEnterActive,
				exit: classes.modalExit,
				exitActive: classes.modalExitActive,
			}}
			mountOnEnter
			unmountOnExit
		>
			<ModalOverlay {...props} />
		</CSSTransition>
	</>
);

export default Modal;
