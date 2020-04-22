const requestData = async (method, link, data) => {
	try {
		const options = {
			method: method,
			headers: { 'Content-Type': 'application/json' },
		};

		if (data) {
			options.body = JSON.stringify(data);
		}

		const res = await fetch(link, options);
		return await res.json();
	} catch (err) {
		console.error(err);
		return {error: 'An error occured. Try again later.'};
	}
};

export const getRequest = async (link, data) => {
	return await requestData('GET', link, data);
};

export const postRequest = async (link, data) => {
	return await requestData('POST', link, data);
};

export const patchRequest = async (link, data) => {
	return await requestData('PATCH', link, data);
};

export const deleteRequest = async (link, data) => {
	return await requestData('DELETE', link, data);
};
