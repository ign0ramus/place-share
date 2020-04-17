import React from 'react';

import Button from '../../common/Button/Button';
import PlaceItem from './PlaceItem/PlaceItem';
import Card from '../../common/Card/Card';
import classes from './PlacesList.module.scss';

const PlacesList = ({ places }) => (
	<div className={classes.container}>
		{!places.length ? (
			<Card className={classes.empty}>
				<h2>No places found!</h2>
				<Button to='/places/new'>Share place</Button>
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
