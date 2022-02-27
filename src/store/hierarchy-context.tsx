import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from 'react';

import Event from '../types/event';
import SubEventContext from './sub-event-context';

type HierarchyContextObject = {
	hierarchy: Event[];
	setHierarchy: Dispatch<SetStateAction<Event[]>>;
	triggerHierarchy: (id: number) => void;
};

const HierarchyContext = React.createContext<HierarchyContextObject>({
	hierarchy: [],
	setHierarchy: () => [],
	triggerHierarchy: () => {},
});

export const HierarchyContextProvider: React.FC = (props) => {
	const [hierarchy, setHierarchy] = useState<Event[]>([]);

	const subEventCtx = useContext(SubEventContext);
	const { selectedSubEvent } = subEventCtx;

	// FIXME NOT SURE IF THIS ACTUALLY WORKS - ERRORS TO RESOLVE
	const triggerHierarchy = useCallback(
		(id: number) => {
			const containsTask = (event: Event) => event.id === id;

			const containsEvent: (hierarchy: Event[]) => boolean = () => {
				return hierarchy.some(containsTask);
			};

			if (!containsEvent(hierarchy)) {
				setHierarchy((prevState) => [
					...prevState,
					...selectedSubEvent,
				]);
			}
		},
		[hierarchy, selectedSubEvent, setHierarchy]
	);

	return (
		<HierarchyContext.Provider
			value={{
				hierarchy: hierarchy,
				setHierarchy: setHierarchy,
				triggerHierarchy: triggerHierarchy,
			}}
		>
			{props.children}
		</HierarchyContext.Provider>
	);
};

export default HierarchyContext;
