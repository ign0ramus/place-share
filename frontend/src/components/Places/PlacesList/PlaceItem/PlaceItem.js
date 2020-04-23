import React, { useState, useContext } from 'react';

import Card from '../../../common/Card/Card';
import Button from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import Map from '../../../common/Map/Map';
import { UserContext } from '../../../../context/UserContext';
import classes from './PlaceItem.module.scss';

const PlaceItem = ({ place, onDelete }) => {
	const [isMapOpen, setIsMapOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const userContext = useContext(UserContext);

	const handleOpenMap = () => setIsMapOpen(true);
	const hanldeCloseMap = () => setIsMapOpen(false);

	const handleOpenDelete = () => setIsDeleteOpen(true);
	const handleCloseDelete = () => setIsDeleteOpen(false);

	const handleDelete = async () => {
		await onDelete(place._id);
		handleCloseDelete();
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
			<Modal
				isOpen={isDeleteOpen}
				onCancel={handleCloseDelete}
				header='Are you sure?'
				footerClass={classes.placeActions}
				footer={
					<>
						<Button
							className={classes.btn}
							onClick={handleCloseDelete}
							type='inverse'
						>
							Cancel
						</Button>
						<Button
							className={classes.btn}
							onClick={handleDelete}
							type='danger'
						>
							Delete
						</Button>
					</>
				}
			>
				<p>
					Do you want to proceed and delete this place? Please note that it
					can't be undone thereafter.
				</p>
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
						{userContext.user && (
							<>
								<Button to={`/places/${place._id}`}>Edit</Button>
								<Button onClick={handleOpenDelete} type='danger'>
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
