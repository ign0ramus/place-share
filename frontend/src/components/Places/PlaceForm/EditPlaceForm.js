import React from 'react';

import Card from '../../common/Card/Card';
import { useForm } from '../../../hooks/formHook';
import Form from '../../common/Form/Form';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import classes from './EditPlaceForm.module.scss';

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

	const [state, handleChange] = useForm(initInputs, {});

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	if (props.error) {
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
			<Button type='submit' disabled={state.isSubmitDisabled}>
				Edit place
			</Button>
		</Form>
	);
};

export default EditPlaceForm;
