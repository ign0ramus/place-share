import React from 'react';
import { useParams } from 'react-router-dom';

import PlacesList from '../components/Places/PlacesList/PlacesList';

const Places = () => {
	const { userId } = useParams();
	return <PlacesList userId={userId} />;
};

export default Places;
