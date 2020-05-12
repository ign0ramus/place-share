import React, { useRef } from 'react';
import classnames from 'classnames';

import { API_STATIC_URL } from '../../../const/api';
import classes from './Avatar.module.scss';

const Avatar = (props) => {
	const imageRef = useRef();
	const handleImageError = () => {
		imageRef.current.src = '/images/avatar.jpg';
	};

	return (
		<div className={classnames(classes.container, props.className)}>
			<img
				ref={imageRef}
				className={classes.avatar}
				src={
					props.img ? `${API_STATIC_URL}/${props.img}` : '/images/avatar.jpg'
				}
				onError={handleImageError}
				alt='Avatar'
			/>
		</div>
	);
};

export default Avatar;
