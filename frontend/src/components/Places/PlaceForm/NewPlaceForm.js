import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import isObject from 'lodash.isobject';

import { useForm } from '../../../hooks/formHook';
import Form from '../../common/Form/Form';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { ADD_NEW_PLACE_API } from '../../../const/api';
import { MY_PLACES_URL } from '../../../const/urls';
import { useHttpClient } from '../../../hooks/httpHook';
import Spinner from '../../common/Spinner/Spinner';
import { UserContext } from '../../../context/UserContext';
import { postRequest } from '../../../util/fetch';
import ImageUpload from '../../common/ImageUpload/ImageUpload';
import classes from './styles.module.scss';

const createInitInputs = () => ({
	title: {
		value: '',
		id: 'title',
	},
	description: {
		value: '',
		id: 'description',
	},
	address: {
		value: '',
		id: 'address',
	},
	image: {
		value: null,
		id: 'image',
	},
});

const NewPlaceForm = () => {
	const [state, handleChange, setErrors, resetState] = useForm(
		createInitInputs(),
		{}
	);
	const { isLoading, sendRequest } = useHttpClient(
		ADD_NEW_PLACE_API,
		postRequest
	);
	const [requestError, setRequestError] = useState(null);
	const { user } = useContext(UserContext);
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', state.inputs.title.value);
		formData.append('description', state.inputs.description.value);
		formData.append('address', state.inputs.address.value);
		formData.append('image', state.inputs.image.value);

		const res = await sendRequest({ formData, isFormData: true });

		if (res.error) {
			if (isObject(res.error)) {
				return setErrors(res.error);
			}

			return setRequestError(res.error);
		}
		resetState(createInitInputs(), {});
		history.push(MY_PLACES_URL(user._id));
	};

	return isLoading ? (
		<Spinner asOverlay />
	) : (
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
			<Input
				id={state.inputs.address.id}
				element='input'
				value={state.inputs.address.value}
				onChange={handleChange}
				error={state.errors.address}
			/>
			<ImageUpload
				imageText={'Upload photo of a place'}
				id='image'
				onImageInput={handleChange}
			/>
			{requestError && <span className={classes.error}>{requestError}</span>}
			<Button type='submit' disabled={state.isSubmitDisabled}>
				{'Add place'}
			</Button>
		</Form>
	);
};

export default NewPlaceForm;
