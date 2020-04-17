import React from 'react';
import { isEmpty } from 'lodash';

import { useForm } from '../../../hooks/placeFormHook';
import Form from '../../common/Form/Form';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

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

	const [ state, handleChange ] = useForm(initInputs, {});

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const isInitState = () => isEmpty(state.errors);
	const hasErrors = () => Object.values(state.errors).some(Boolean);
	const isEveryInputFilled = () =>
		!Object.values(state.inputs).every((el) => Boolean(el.value));
	const wasPlaceDataChanged = () =>
		Object.values(state.inputs).some((el) => el.value !== props.place[el.id]);

	const isBtnDisabled = () =>
		isInitState() ||
		hasErrors() ||
		isEveryInputFilled() ||
		!wasPlaceDataChanged();

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
			<Button type='submit' disabled={isBtnDisabled()}>
				Edit place
			</Button>
		</Form>
	);
};

export default EditPlaceForm;
