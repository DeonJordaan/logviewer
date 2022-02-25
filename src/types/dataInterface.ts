interface DataInterface {
	App: string;
	taskCode: string;
	endTime: string;
	host: string;
	id: number;
	Level: number;
	message: string;
	parentId: number;
	startTime: string;
	status: number;
	subEvents: number;
	// subEvents: [];
}

export default DataInterface;

// NOTE Example of all the task/event data provided by the DB
// AppName: "MetroIQ - SQL Processing"
// Code: "Refresh.Township.Chart"
// Completed: "2021-08-05T12:36:57.1966667"
// Host: "CPTDEVWADB01"
// Id: 18805
// Level: 2
// Message: "Completed Refresh.Township.Chart"
// ParentId: null
// Started: "2021-08-05T12:36:56.9"
// Status: 2
// SubEventCount: 0
// SubEvents: []
