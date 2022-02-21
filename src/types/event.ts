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
		this.key = data.Id;
		this.id = data.Id;
		this.App = data.AppName;
		this.taskCode = data.Code;
		this.startTime = data.Started;
		this.endTime = data.Completed;
		this.subEvents = data.SubEventCount;
		this.host = data.Host;
		this.message = data.Message;
		this.status = data.Status;
		this.parentId = data.ParentId;
	}
}

export default Event;
