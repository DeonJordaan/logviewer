import React, { useEffect } from 'react';
import { useState } from 'react';
import useFetch from './useFetch';

type Application = {
	Name: string;
	HostData: string;
	Id: number;
};

type AppListContextObject = {
	apps: string[] | undefined;
	isLoading: boolean;
	error: string | null;
};

const AppListContext = React.createContext<AppListContextObject>({
	apps: [],
	isLoading: false,
	error: null,
});

export const AppListContextProvider: React.FC = (props) => {
	const [appList, setAppList] = useState<string[]>();

	const { isLoading, error, sendRequest: fetchApps } = useFetch();

	useEffect(() => {
		const transformData = (appData: Application[]) => {
			const allApps = appData.map((app) => app.Name);

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
				apps: appList,
				isLoading: isLoading,
				error: error,
			}}
		>
			{props.children}
		</AppListContext.Provider>
	);
};

export default AppListContext;
