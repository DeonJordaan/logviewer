import DataInterface from './dataInterface';

// FIXME When the only thing a class does is hold a list of values, then a class is overkill. Can JUST use the Interface
class Event {
	key: number;
	id: number;
	App: string;
	taskCode: string;
	startTime: string;
	endTime: string;
	subEvents: number;
	host: string;
	message: string;
	status: number;
	parentId: number;

	// NOTE GETTER TO SET THE STATUS. JUST AN IDEA, NOT SURE THIS CAN WORK. IF IT CAN, WOULD LIKELY IMPORT statusInterface AND USE IT HERE
	// getEventStatus(statusCode: keyof object): string {
	// 	const status: {
	// 		0: string;
	// 		1: string;
	// 		2: string;
	// 		3: string;
	// 		4: string;
	// 	} = {
	// 		0: 'NotSet',
	// 		1: 'Started',
	// 		2: 'Completed',
	// 		3: 'Aborted',
	// 		4: 'Failed',
	// 	};
	// 	return status[statusCode];
	// }

	constructor(data: DataInterface) {
		this.key = data.id;
		this.id = data.id;
		this.App = data.App;
		this.taskCode = data.taskCode;
		this.startTime = data.startTime;
		this.endTime = data.endTime;
		this.subEvents = data.subEvents;
		this.host = data.host;
		this.message = data.message;
		this.status = data.status;
		this.parentId = data.parentId;
	}
}

export default Event;
