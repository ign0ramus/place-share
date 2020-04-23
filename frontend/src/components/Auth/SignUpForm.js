import React, { useContext, useState } from 'react';
import isObject from 'lodash.isobject';

import { useForm } from '../../hooks/formHook';
import Card from '../common/Card/Card';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import classes from './styles.module.scss';
import { UserContext } from '../../context/UserContext';
import { VALIDATOR_MINLENGTH } from '../../util/validator';
import ImageUpload from '../common/ImageUpload/ImageUpload';

const initInputs = {
	email: {
		id: 'email',
		value: '',
	},
	password: {
		id: 'password',
		value: '',
		validators: [VALIDATOR_MINLENGTH(6)],
	},
	name: {
		id: 'name',
		value: '',
	},
	image: {
		id: 'image',
		value: null,
	},
};

const SignInForm = () => {
	const [requestError, setRequestError] = useState(null);
	const [state, handleChange, setErrors] = useForm(initInputs, {});
	const { signUp, setUser } = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await signUp({
			email: state.inputs.email.value,
			name: state.inputs.name.value,
			password: state.inputs.password.value,
		});

		if (res.error) {
			if (isObject(res.error)) {
				return setErrors(res.error);
			}

			return setRequestError(res.error);
		}

		setUser(res.result);
	};

	return (
		<Card className={classes.container}>
			<h2>Sign Up</h2>
			<hr />
			<form onSubmit={handleSubmit}>
				<Input
					element='input'
					id={state.inputs.email.id}
					type='email'
					onChange={handleChange}
					error={state.errors.email}
				/>
				<Input
					element='input'
					id={state.inputs.name.id}
					type='text'
					onChange={handleChange}
					error={state.errors.name}
				/>
				<ImageUpload
					imageText={'Pick your avatar'}
					center
					id='image'
					onImageInput={handleChange}
				/>
				<Input
					element='input'
					id={state.inputs.password.id}
					type='password'
					onChange={handleChange}
					error={state.errors.password}
				/>
				{requestError && <span className={classes.error}>{requestError}</span>}
				<Button type='submit' disabled={state.isSubmitDisabled}>
					{'Sign up'}
				</Button>
			</form>
		</Card>
	);
};

export default SignInForm;
