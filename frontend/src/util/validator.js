const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MINLENGTH,
	val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MAXLENGTH,
	val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = ({ value, id }, validators) => {
	let error = null;
	for (const validator of validators) {
		if (validator.type === VALIDATOR_TYPE_REQUIRE) {
			if (!error && value.trim().length <= 0) {
				error = `${id} should not be empty`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
			if (!error && value.trim().length < validator.val) {
				error = `${id} should be at least ${validator.val} character long`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
			if (!error && value.trim().length > validator.val) {
				error = `${id} maximum length is ${validator.val}`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MIN) {
			if (!error && +value < validator.val) {
				error = `${id} should not be lower than ${validator.val}`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MAX) {
			if (!error && +value > validator.val) {
				error = `${id} should not be higher than ${validator.val}`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_EMAIL) {
			if (!error && /^\S+@\S+\.\S+$/.test(value)) {
				error = `${id} is not correct email`;
			}
		}
	}
	return error;
};
