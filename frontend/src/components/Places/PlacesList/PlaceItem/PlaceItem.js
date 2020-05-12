import React, { useState, useContext, useRef } from 'react';

import Card from '../../../common/Card/Card';
import Button from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import Map from '../../../common/Map/Map';
import { UserContext } from '../../../../context/UserContext';
import { API_STATIC_URL } from '../../../../const/api';
import classes from './PlaceItem.module.scss';

const PlaceItem = ({ place, onOpenDelete }) => {
	const [isMapOpen, setIsMapOpen] = useState(false);
	const userContext = useContext(UserContext);
	const imageRef = useRef();

	const handleOpenMap = () => setIsMapOpen(true);
	const hanldeCloseMap = () => setIsMapOpen(false);
	const handleImageError = () => {
		imageRef.current.src = '/images/place.png';
	};

	return (
		<>
			<Modal
				isOpen={isMapOpen}
				onCancel={hanldeCloseMap}
				header={place.address}
				contentClass={classes.modalContent}
				footerClass={classes.modalActions}
				footer={<Button onClick={hanldeCloseMap}>Close</Button>}
			>
				<div className={classes.mapContainer}>
					<Map center={place.location} zoom={16} />
				</div>
			</Modal>
			<li className={classes.container}>
				<Card className={classes.placeContent}>
					<div className={classes.placeImage}>
						<img
							ref={imageRef}
							onError={handleImageError}
							src={
								place.image
									? `${API_STATIC_URL}/${place.image}`
									: '/images/place.png'
							}
							alt={place.title}
						/>
					</div>
					<div className={classes.placeInfo}>
						<h2>{place.title}</h2>
						<h3>{place.address}</h3>
						<p>{place.description}</p>
					</div>
					<div className={classes.placeActions}>
						<Button type='inverse' onClick={handleOpenMap}>
							View on map
						</Button>
						{userContext.user && userContext.user._id === place.creator && (
							<>
								<Button to={`/places/${place._id}`}>Edit</Button>
								<Button onClick={onOpenDelete} type='danger'>
									Delete
								</Button>
							</>
						)}
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
