import React from 'react';

import { useForm } from '../../../hooks/formHook';
import Form from '../../common/Form/Form';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const initInputs = {
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
};

const NewPlaceForm = () => {
	const [state, handleChange] = useForm(initInputs, {});

	const handleSubmit = (e) => {
		e.preventDefault();
	};

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
			<Input
				id={state.inputs.address.id}
				element='input'
				value={state.inputs.address.value}
				onChange={handleChange}
				error={state.errors.address}
			/>
			<Button type='submit' disabled={state.isSubmitDisabled}>
				Add place
			</Button>
		</Form>
	);
};

export default NewPlaceForm;
