import { useState, useCallback } from 'react';

const useFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	// const [data, setData] = useState([]);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body
					? JSON.stringify(requestConfig.body)
					: null,
			});

			if (!response.ok) {
				throw new Error('Could not retrieve data');
			}

			const data = await response.json();
			console.log(data);

			applyData(data);
		} catch (error) {
			console.log('Error');
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	return { isLoading, error, sendRequest }; //REMOVED , data
};

export default useFetch;

//PREVIOUS ATTEMPT AT useFetch
// useEffect(() => {
// 	setIsLoading(true);
// 	setError(null);
// 	const fetchData = async () => {
// 		try {
// 			const response = await fetch(url);

// 			if (!response.ok) {
// 				throw new Error('Could not retrieve data');
// 			}

// 			const data = await response.json();
// 			console.log(data);

// 			setData(data);
// 		} catch (error) {
// 			console.log('Error');
// 			setError(error.message);
// 		}
// 	};
// 	fetchData();
// 	setIsLoading(false);
// }, [url]);
///////////////////////////

// const useFetch = (url) => {
// 	const cache = useRef({});
// 	const [status, setStatus] = useState('idle');
// 	const [data, setData] = useState([]);

// 	useEffect(() => {
// 		if (!url) return;
// 		const fetchData = async () => {
// 			setStatus('fetching');
// 			if (cache.current[url]) {
// 				const data = cache.current[url];
// 				setData(data);
// 				setStatus('fetched');
// 			} else {
// 				const response = await fetch(url);
// 				const data = await response.json();
// 				cache.current[url] = data; // set response in cache;
// 				setData(data);
// 				setStatus('fetched');
// 			}
// 		};

// 		fetchData();
// 	}, [url]);

// 	return { status, data };
// };

//LEFT IN DATAWORKER
// const { Data: allData, TotalRecordCount: recordCount } = data;

// const allTasks = allData.map((taskData) => {
// 	return {
// 		key: taskData.Id,
// 		id: taskData.Id,
// 		App: taskData.AppName,
// 		taskCode: taskData.Code,
// 		startTime: taskData.Started,
// 		endTime: taskData.Completed,
// 		subEvents: taskData.SubEventCount,
// 		host: taskData.Host,
// 		message: taskData.Message,
// 		status: taskData.Status,
// 	};
// });

// setTasks(allTasks);
// setTotalRecordCount(recordCount);
