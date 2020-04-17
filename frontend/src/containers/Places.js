import React from 'react';
import { useParams } from 'react-router-dom';

import PlacesList from '../components/Places/PlacesList/PlacesList';

const PLACES = [
	{
		id: '1pid',
		title: 'Empire',
		description: 'WOW',
		image:
			'https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/21/202/tdih-may01-HD.jpg?w=1440',
		address: '20W 34th StaticRange, New York, NY 10001',
		coordinates: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: '2id',
	},
	{
		id: '2pid',
		title: 'Empire',
		description: 'WOW',
		image:
			'https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/21/202/tdih-may01-HD.jpg?w=1440',
		address: '20W 34th StaticRange, New York, NY 10001',
		coordinates: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: '2id',
	},
];

const Places = () => {
	const { userId } = useParams();
	const places = PLACES.filter((place) => place.creator === userId);
	return <PlacesList places={places} />;
};

export default Places;
