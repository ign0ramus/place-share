import React, { useState } from 'react';

import Card from '../../../common/Card/Card';
import Button from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import Map from '../../../common/Map/Map';
import classes from './PlaceItem.module.scss';

const PlaceItem = ({ place }) => {
	const [isMapOpen, setIsMapOpen] = useState(false);

	const handleOpenMap = () => setIsMapOpen(true);
	const hanldeCloseMap = () => setIsMapOpen(false);

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
					<Map center={place.coordinates} zoom={16}/>
				</div>
			</Modal>
			<li className={classes.container}>
				<Card className={classes.placeContent}>
					<div className={classes.placeImage}>
						<img src={place.image} alt={place.title} />
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
						<Button to={`/places/${place.id}`}>Edit</Button>
						<Button type='danger'>Delete</Button>
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
