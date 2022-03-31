import DataInterface from './dataInterface';

// FIXME When the only thing a class does is hold a list of values, then a class is overkill. Can JUST use the Interface
class Event {
	Key: number;
	Id: number;
	AppName: string;
	EventName: string;
	StartTime: string;
	EndTime: string;
	EventCount: number;
	Host: string;
	Message: string;
	StatusId: number;
	ParentEventId: number;

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
		this.Key = data.Id;
		this.Id = data.Id;
		this.AppName = data.AppName;
		this.EventName = data.EventName;
		this.StartTime = data.StartTime;
		this.EndTime = data.EndTime;
		this.EventCount = data.EventCount;
		this.Host = data.Host;
		this.Message = data.Message;
		this.StatusId = data.StatusId;
		this.ParentEventId = data.ParentEventId;
	}
}

export default Event;
