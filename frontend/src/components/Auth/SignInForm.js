import React, { useContext, useState } from 'react';

import { useForm } from '../../hooks/formHook';
import Card from '../common/Card/Card';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import { UserContext } from '../../context/UserContext';
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

const SignInForm = () => {
	const [authError, setAuthError] = useState(null);
	const [state, handleChange] = useForm(initInputs, {});
	const { signIn, setUser } = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await signIn({
			email: state.inputs.email.value,
			password: state.inputs.password.value,
		});

		if (res.error) {
			return setAuthError(res.error);
		}

		setUser(res.result);
	};

	return (
		<Card className={classes.container}>
			<h2>{'Sign In'}</h2>
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
				/>
				{authError && <span className={classes.error}>{authError}</span>}
				<Button type='submit' disabled={state.isSubmitDisabled}>
					{'Sign in'}
				</Button>
			</form>
		</Card>
	);
};

export default SignInForm;
