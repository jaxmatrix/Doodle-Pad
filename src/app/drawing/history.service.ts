import { Injectable } from '@angular/core';
import { DrawEvent } from './action-stack';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
				
	undoStack : DrawEvent[] = []; 
	redoStack : DrawEvent[] = [];

	constructor() { 
	}
	
	addTask(taskName: string, taskId: string, pointList: Array<number>) {
		let task = new DrawEvent(taskName, taskId, pointList);
		this.undoStack.push(task);
		console.log('History Event: Adding Task', this.undoStack);
		
		// Removing future history 
		if(this.redoStack) this.redoStack = [];
	}

	undo() {
		let lastTask = this.undoStack.pop();
		this.redoStack.push(lastTask);
		console.log('History Service UNDO STACK', this.undoStack.length);
		console.log('History Service REDO STACK', this.redoStack.length);
		return lastTask;
	}

	redo() {
		let lastTask = this.redoStack.pop();

		if( lastTask != undefined) {
			this.undoStack.push(lastTask);
		}
		console.log('History Service UNDO STACK', this.undoStack.length);
		console.log('History Service REDO STACK', this.redoStack.length);
			
		return lastTask;
	}


}
