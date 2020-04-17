import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';

import classes from './Map.module.scss';

const Map = (props) => {
	const mapRef = useRef();

	useEffect(() => {
		new window.ol.Map({
			target: mapRef.current.id,
			layers: [
				new window.ol.layer.Tile({
					source: new window.ol.source.OSM(),
				}),
			],
			view: new window.ol.View({
				center: window.ol.proj.fromLonLat([props.center.lng, props.center.lat]),
				zoom: props.zoom,
			}),
		});
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
