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
import classes from './PlacesList.module.scss';

const PlacesList = ({ userId }) => {
	const [places, setPlaces] = useState([]);
	const { isLoading, sendRequest, error } = useHttpClient(
		GET_USERS_PLACES_API(userId),
		getRequest
	);

	useEffect(() => {
		const fetchPlaces = async () => {
			const res = await sendRequest();
			if (!error) {
				setPlaces(res.result);
			}
		};

		fetchPlaces();
	}, [sendRequest]);

	const handleDeleteItem = async (placeId) => {
		await deleteRequest(GET_OR_EDIT_PLACE_API(placeId));
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
						key={place._id}
						place={place}
						onDelete={handleDeleteItem}
					/>
				))}
			</ul>
		);
	};

	return <div className={classes.container}>{renderUsers()}</div>;
};

export default PlacesList;
