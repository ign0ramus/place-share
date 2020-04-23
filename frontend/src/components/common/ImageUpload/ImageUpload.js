import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import Button from '../Button/Button';
import classes from './ImageUpload.module.scss';

const ImageUpload = (props) => {
	const [image, setImage] = useState();
	const [imageUrl, setImageUrl] = useState();
	const [isValid, setIsValid] = useState(true);
	const filePickerRef = useRef();

	const handleClick = () => {
		filePickerRef.current.click();
	};

	const handleFileChange = (e) => {
		const { files } = e.target;
		let imageFile = null;
		if (files && files.length === 1) {
			imageFile = files[0];
			setImage(imageFile);
		} else {
			setIsValid(false);
		}
		props.onImageInput({ target: { value: imageFile, id: props.id } });
	};

	useEffect(() => {
		if (!image) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setImageUrl(fileReader.result);
		};
		fileReader.readAsDataURL(image);
	}, [image]);

	return (
		<div className={classes.container}>
			<input
				ref={filePickerRef}
				type='file'
				id={props.id}
				style={{ display: 'none' }}
				accept='.jpg,.png,.jpeg'
				onChange={handleFileChange}
			/>
			<div className={classnames({ [classes.center]: props.center })}>
				<div className={classes.preview}>
					{imageUrl ? (
						<img src={imageUrl} alt='Preview' />
					) : (
						<div className={classes.text}>
							<p>{props.imageText}</p>
							<p className={classes.warning}>
								{
									'Please, note that all your uploaded images will be removed after a while, as the site is hosted on a free server.'
								}
							</p>
						</div>
					)}
				</div>
				<Button type='button' onClick={handleClick}>
					{'Pick Image'}
				</Button>
			</div>
			{!isValid && (
				<span className={classes.error}>{'Pick a valid image'}</span>
			)}
		</div>
	);
};

export default ImageUpload;
