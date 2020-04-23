import React, { useEffect, useState } from 'react';

import {
	GET_USERS_PLACES_API,
	GET_OR_EDIT_PLACE_API,
} from '../../../const/api';
import { getRequest, deleteRequest } from '../../../util/fetch';
import { useHttpClient } from '../../../hooks/httpHook';
import Spinner from '../../common/Spinner/Spinner';
import Button from '../../common/Button/Button';
import PlaceItem from './PlaceItem/PlaceItem';
import Card from '../../common/Card/Card';
import Modal from '../../common/Modal/Modal';
import classes from './PlacesList.module.scss';

const PlacesList = ({ userId }) => {
	const [places, setPlaces] = useState([]);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const { isLoading, sendRequest, error } = useHttpClient(
		GET_USERS_PLACES_API(userId),
		getRequest
	);

	useEffect(() => {
		const fetchPlaces = async () => {
			const res = await sendRequest();
			if (!res.error) {
				setPlaces(res.result);
			}
		};

		fetchPlaces();
	}, [sendRequest]);

	const handleDeleteItem = async () => {
		await deleteRequest(GET_OR_EDIT_PLACE_API(deleteId));
		setPlaces((places) => places.filter((place) => place._id !== deleteId));
		handleCloseDelete();
	};

	const handleOpenDelete = (placeId) => {
		setIsDeleteOpen(true);
		setDeleteId(placeId);
	};

	const handleCloseDelete = () => {
		setIsDeleteOpen(false);
		setDeleteId(null);
	};

	const renderUsers = () => {
		if (!places && !isLoading) {
			return null;
		}

		if (isLoading) {
			return <Spinner asOverlay />;
		}

		if (error) {
			return <span className={classes.error}>{error}</span>;
		}

		return !places.length ? (
			<Card className={classes.empty}>
				<h2>{'No places found!'}</h2>
				<Button to='/places/new'>{'Share place'}</Button>
			</Card>
		) : (
			<ul className={classes.placesList}>
				{places.map((place) => (
					<PlaceItem
						onOpenDelete={() => handleOpenDelete(place._id)}
						key={place._id}
						place={place}
					/>
				))}
			</ul>
		);
	};

	return (
		<div className={classes.container}>
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
							onClick={handleDeleteItem}
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
			{renderUsers()}
		</div>
	);
};

export default PlacesList;
