import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EditPlaceForm from '../components/Places/PlaceForm/EditPlaceForm';
import { useHttpClient } from '../hooks/httpHook';
import { getRequest } from '../util/fetch';
import { GET_OR_EDIT_PLACE_API } from '../const/api';
import Spinner from '../components/common/Spinner/Spinner';

const EditPlace = () => {
	const { placeId } = useParams();
	const [place, setPlace] = useState(null);
	const { sendRequest, error, isLoading } = useHttpClient(
		GET_OR_EDIT_PLACE_API(placeId),
		getRequest
	);

	useEffect(() => {
		const fetchPlace = async () => {
			const res = await sendRequest();
			if (res.error) {
				setPlace(res.result);
			}
		};

		fetchPlace();
	}, [sendRequest]);

	const renderEditPlace = () => {
		if (!place && !isLoading) {
			return null;
		}

		if (isLoading) {
			return <Spinner asOverlay />;
		}

		return <EditPlaceForm place={place} getPlaceError={error} />;
	};

	return renderEditPlace();
};

export default EditPlace;
