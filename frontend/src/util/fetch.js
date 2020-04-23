const requestData = async (method, link, data, params = {}) => {
	try {
		const options = {
			method: method,
			...params,
		};
		if (!data || (data && !data.isFormData)) {
			options.headers = { 'Content-Type': 'application/json' };
		}
		if (data && !data.isFormData) {
			options.body = JSON.stringify(data);
		}
		if (data && data.isFormData) {
			options.body = data.formData;
		}

		const res = await fetch(link, options);
		return await res.json();
	} catch (err) {
		console.error(err);
		return { error: 'An error occured. Try again later.' };
	}
};

export const getRequest = async (link, data, params) => {
	return await requestData('GET', link, data, params);
};

export const postRequest = async (link, data, params) => {
	return await requestData('POST', link, data, params);
};

export const patchRequest = async (link, data, params) => {
	return await requestData('PATCH', link, data, params);
};

export const deleteRequest = async (link, data, params) => {
	return await requestData('DELETE', link, data, params);
};
