import { useReducer } from 'react';

import {
	validate,
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../util/validator';

const formValidators = {
	title: [VALIDATOR_REQUIRE()],
	description: [VALIDATOR_MINLENGTH(5)],
	address: [VALIDATOR_REQUIRE()],
};

const formReducer = (state, action) => {
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

export const useForm = (initInputs, initErrors) => {
	const [state, dispatch] = useReducer(formReducer, {
		inputs: initInputs,
		errors: initErrors,
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
    
    return [ state, handleChange ];
};
