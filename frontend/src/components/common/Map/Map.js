import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';

import classes from './Map.module.scss';

const Map = (props) => {
	const mapRef = useRef();

	useEffect(() => {
		const map = new window.google.maps.Map(mapRef.current, {
			center: props.center,
			zoom: props.zoom,
		});

		new window.google.maps.Marker({ position: props.center, map });
	}, [props.center, props.zoom]);

	return (
		<div
			ref={mapRef}
			className={classnames(classes.container, props.className)}
			style={props.style}
			id='map'
		></div>
	);
};

export default Map;
