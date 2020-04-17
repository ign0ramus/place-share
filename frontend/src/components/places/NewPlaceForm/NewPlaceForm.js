import React, { useReducer } from 'react';
import { isEmpty } from 'lodash';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import {
	validate,
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../../../util/validator';
import classes from './NewPlaceForm.module.scss';

const formValidators = {
	title: [VALIDATOR_REQUIRE()],
	description: [VALIDATOR_MINLENGTH(5)],
	address: [VALIDATOR_REQUIRE()],
};

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			const newInputs = { ...state.inputs };
			const newErrors = { ...state.errors };
			for (const inputId in state.inputs) {
				if (inputId === action.input.id) {
					newInputs[inputId].value = action.input.value;
					newErrors[inputId] = validate(action.input, action.validators);
				}
			}
			return {
				...state,
				inputs: newInputs,
				errors: newErrors,
			};
		default:
			return state;
	}
};

const NewPlaceForm = () => {
	const [state, dispatch] = useReducer(inputReducer, {
		inputs: {
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
		},
		errors: {},
	});

	const handleChange = (e) => {
		dispatch({
			type: 'INPUT_CHANGE',
			input: {
				value: e.target.value,
				id: e.target.id,
			},
			validators: formValidators[e.target.id],
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const isBtnDisabled = () =>
		isEmpty(state.errors) ||
		Object.values(state.errors).some(Boolean) ||
		!Object.values(state.inputs).every((el) => Boolean(el.value));

	return (
		<form className={classes.container} onSubmit={handleSubmit}>
			<Input
				id={state.inputs.title.id}
				element='input'
				type='text'
				value={state.title}
				onChange={handleChange}
				error={state.errors.title}
			/>
			<Input
				id={state.inputs.description.id}
				element='textarea'
				value={state.description}
				onChange={handleChange}
				error={state.errors.description}
			/>
			<Input
				id={state.inputs.address.id}
				element='input'
				value={state.description}
				onChange={handleChange}
				error={state.errors.address}
			/>
			<Button type='submit' disabled={isBtnDisabled()}>
				Add place
			</Button>
		</form>
	);
};

export default NewPlaceForm;
