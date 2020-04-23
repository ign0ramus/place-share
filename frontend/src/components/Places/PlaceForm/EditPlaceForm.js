import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import isObject from 'lodash.isobject';

import { useHttpClient } from '../../../hooks/httpHook';
import { GET_OR_EDIT_PLACE_API } from '../../../const/api';
import { MY_PLACES_URL } from '../../../const/urls';
import { patchRequest } from '../../../util/fetch';
import Card from '../../common/Card/Card';
import { useForm } from '../../../hooks/formHook';
import Form from '../../common/Form/Form';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { UserContext } from '../../../context/UserContext';
import classes from './styles.module.scss';

const EditPlaceForm = (props) => {
	const initInputs = {
		title: {
			value: props.place.title || '',
			id: 'title',
		},
		description: {
			value: props.place.description || '',
			id: 'description',
		},
	};
	const { sendRequest } = useHttpClient(
		GET_OR_EDIT_PLACE_API(props.place._id),
		patchRequest
	);
	const [state, handleChange, setErrors] = useForm(initInputs, {});
	const [requestError, setRequestError] = useState(null);
	const history = useHistory();
	const { user } = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await sendRequest({
			title: state.inputs.title.value,
			description: state.inputs.description.value,
		});

		if (res.error) {
			if (isObject(res.error)) {
				return setErrors(res.error);
			}

			return setRequestError(res.error);
		}
		history.push(MY_PLACES_URL(user._id));
	};

	if (props.getPlaceError) {
		return (
			<div className={classes.container}>
				<Card>
					<h2>Could not find the place!</h2>
				</Card>
			</div>
		);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				id={state.inputs.title.id}
				element='input'
				type='text'
				value={state.inputs.title.value}
				onChange={handleChange}
				error={state.errors.title}
			/>
			<Input
				id={state.inputs.description.id}
				element='textarea'
				value={state.inputs.description.value}
				onChange={handleChange}
				error={state.errors.description}
			/>
			{requestError && <span className={classes.error}>{requestError}</span>}
			<Button type='submit' disabled={state.isSubmitDisabled}>
				{'Edit place'}
			</Button>
		</Form>
	);
};

export default EditPlaceForm;
