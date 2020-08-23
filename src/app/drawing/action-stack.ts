export class DrawEvent {
	taskName : string;
	taskId : string;
	taskCoordinateList : Array<number>;

	constructor(taskName: string, taskId: string, taskCoordinateList: Array<number>) {
			this.taskName = taskName;
			this.taskId = taskId;
			this.taskCoordinateList = taskCoordinateList;
	}
	
	setTaskName(name: string) {
		this.taskName = name;
	}

	setTaskId(id: string) {
		this.taskId = id;
	}

	setTaskPointList(pointList : Array<number>) {
		this.taskCoordinateList = pointList;
	}

	getTaskInfo() {
		return {
			'task-name' : this.taskName,
			'task-id' : this.taskId,
			'task-coordinate-list': this.taskCoordinateList
		};			
	}
}
