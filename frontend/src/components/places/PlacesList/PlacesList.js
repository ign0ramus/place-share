import React from 'react';

import PlaceItem from './PlaceItem/PlaceItem';
import Card from '../../common/Card/Card';
import classes from './PlacesList.module.scss';

const PlacesList = ({places}) => (
	<div className={classes.container}>
		{!places.length ? (
			<Card>
				<h2 className={classes.empty}>No places found!</h2>
				<button>Share place</button>
			</Card>
		) : (
			<ul className={classes.placesList}>
				{places.map((place) => (
					<PlaceItem key={place.id} place={place} />
				))}
			</ul>
		)}
	</div>
);

export default PlacesList;
