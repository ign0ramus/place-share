import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import EditPlaceForm from '../components/Places/PlaceForm/EditPlaceForm';

const EditPlace = () => {
	const [place, setPlace] = useState({});
	const [error, setError] = useState({});

	if (!place && !error) {
		return 'Loading...';
	}

	return <EditPlaceForm place={place} error={error} />;
};

export default EditPlace;
