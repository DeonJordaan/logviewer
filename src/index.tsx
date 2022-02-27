import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PaginationContextProvider } from './store/pagination-context';
import { EventContextProvider } from './store/event-context';
import { SubEventContextProvider } from './store/sub-event-context';
import { HierarchyContextProvider } from './store/hierarchy-context';

ReactDOM.render(
	<React.StrictMode>
		<EventContextProvider>
			<PaginationContextProvider>
				<SubEventContextProvider>
					<HierarchyContextProvider>
						<App />
					</HierarchyContextProvider>
				</SubEventContextProvider>
			</PaginationContextProvider>
		</EventContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
