import { useReducer } from 'react';

import {
	validate,
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
} from '../util/validator';

const formValidators = {
	title: [VALIDATOR_REQUIRE()],
	description: [VALIDATOR_MINLENGTH(5)],
	address: [VALIDATOR_REQUIRE()],
	email: [VALIDATOR_EMAIL()],
	password: [],
};

const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			const [inputs, errors] = validateInput(
				state,
				action
			);
			return {
				...state,
				inputs,
				errors,
				isSubmitDisabled: isSubmitDisabled(state, action.initInputs),
			};
		default:
			return state;
	}
};

const isSubmitDisabled = (state, initInputs) => {
	const hasErrors = () => Object.values(state.errors).some(Boolean);
	const isEveryInputFilled = () =>
		!Object.values(state.inputs).every((el) => Boolean(el.value));
	const wasPlaceDataChanged = () =>
		Object.values(state.inputs).some(
			(el) => !initInputs[el.id] || el.value !== initInputs[el.id]
		);

	return hasErrors() || isEveryInputFilled() || !wasPlaceDataChanged();
};

const validateInput = (state, action) => {
	const newInputs = { ...state.inputs };
	const newErrors = { ...state.errors };
	for (const inputId in state.inputs) {
		if (inputId === action.input.id) {
			newInputs[inputId].value = action.input.value;
			newErrors[inputId] = validate(action.input, action.validators);
		}
	}
	return [newInputs, newErrors];
};

export const useForm = (initInputs, initErrors) => {
	const [state, dispatch] = useReducer(formReducer, {
		inputs: initInputs,
		errors: initErrors,
		isSubmitDisabled: true,
	});

	const handleChange = (e) => {
		dispatch({
			type: 'INPUT_CHANGE',
			input: {
				value: e.target.value,
				id: e.target.id,
			},
			initInputs,
			validators: formValidators[e.target.id],
		});
	};

	return [state, handleChange];
};
