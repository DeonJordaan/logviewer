import DataInterface from './dataInterface';

class Event {
	key: number;
	id: number;
	App?: string;
	taskCode?: string;
	startTime: string;
	endTime: string;
	subEvents: number;
	host?: string;
	message: string;
	status: number;

	// getEventStatus(statusCode: keyof object): string {
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
	}
}

export default Event;
