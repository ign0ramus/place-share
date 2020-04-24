import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = (url, requestHandler) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const activeHttpRequest = useRef([]);

	useEffect(() => {
		return () => {
			activeHttpRequest.current.forEach((abortCtrl) => {
				abortCtrl.abort();
			});
		};
	}, []);

	const sendRequest = useCallback(
		async (data) => {
			setIsLoading(true);

			const httpAbordController = new AbortController();
			activeHttpRequest.current.push(httpAbordController);

			const res = await requestHandler(url, data, {
				signal: httpAbordController.signal,
			});

			setIsLoading(false);
			activeHttpRequest.current = activeHttpRequest.current.filter(
				(reqCtrl) => reqCtrl !== httpAbordController
			);
			if (res.error) {
				setError(res.error);
			}

			return res;
		},
		[requestHandler, url]
	);

	return { isLoading, error, sendRequest };
};
