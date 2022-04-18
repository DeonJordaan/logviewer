import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import useFetch from './useFetch';

type Application = {
	Name: string;
	Host: string;
	Id: number;
};

type AppListContextObject = {
	appList: Application[];
	isLoading: boolean;
	error: string | null;
	setAppList: Dispatch<SetStateAction<Application[]>>;
};

const AppListContext = React.createContext<AppListContextObject>({
	appList: [],
	isLoading: false,
	error: null,
	setAppList: () => [],
});

export const AppListContextProvider: React.FC = (props) => {
	const [appList, setAppList] = useState<Application[]>([]);

	const { isLoading, error, sendRequest: fetchApps } = useFetch();

	useEffect(() => {
		const transformData = (appData: Application[]) => {
			// const allApps = appData.map((app) => app.Name);
			const allApps = appData.map((app) => {
				return {
					Name: 'Application',
					Host: 'Host',
					Id: app.Id,
				};
			});

			setAppList(allApps);
		};

		fetchApps(
			{
				url: `http://logviewer.jordaan/api/LogData/GetApplicationList`,
			},
			transformData
		);
	}, [fetchApps]);

	return (
		<AppListContext.Provider
			value={{
				appList: appList,
				isLoading: isLoading,
				error: error,
				setAppList: setAppList,
			}}
		>
			{props.children}
		</AppListContext.Provider>
	);
};

export default AppListContext;
