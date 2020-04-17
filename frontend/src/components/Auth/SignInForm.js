import React from 'react';

import { useForm } from '../../hooks/formHook';
import Card from '../common/Card/Card';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import classes from './styles.module.scss';

const initInputs = {
	email: {
		id: 'email',
		value: '',
	},
	password: {
		id: 'password',
		value: '',
	},
};

const SignInForm = (props) => {
	const [state, handleChange] = useForm(initInputs, {});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Login');
	};

	return (
		<Card className={classes.container}>
			<h2>Sign In</h2>
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
					id={state.inputs.password.id}
					type='password'
					onChange={handleChange}
					error={state.errors.password}
				/>

				<Button type='submit' disabled={state.isSubmitDisabled}>
					Sign in
				</Button>
			</form>
		</Card>
	);
};

export default SignInForm;
