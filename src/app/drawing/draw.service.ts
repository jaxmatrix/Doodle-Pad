import { Injectable } from '@angular/core';
import Konva from 'konva';
import { DocConfigService } from '../doc-config.service';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

	stroke_color = 'red';
	stroke_thickness = 10;
	stroke = false;
	pointList: Array<number>  = []
	stage: Konva.Stage;
	layer: Konva.Layer;
	line: Konva.Line;
	toolset : string = 'pencil';

	constructor(
			private docConfig : DocConfigService, 
			private historyService : HistoryService,
	) { 
			
			this.stroke_color = this.docConfig.getStrokeColor();
			this.stroke_thickness = this.docConfig.getStrokeThickness();
			this.toolset = this.docConfig.getToolset(); 
	}

	setPage(stage: Konva.Stage, layer: Konva.Layer) {
		this.stage = stage;
		this.layer = layer;
		console.log('Draw Service: Setting Stage', this.stage, this.layer);
	}

	startStroke(X: number,Y: number) {

		this.pointList.push(X);
		this.pointList.push(Y);
		this.setTool();
		if( this.toolset == 'pencil' || this.toolset == 'eraser') {
			this.drawLine('start');	
		}
		else if (this.toolset == 'transform') {
			
		}

		this.layer.add(this.line)
		//console.log("Draw Service: startStroke", X, Y, this.pointList);
	}

	makeStroke(X: number, Y: number) {

		if(this.stroke) {	
									
			if( this.toolset == 'pencil' || this.toolset == 'eraser') {
					this.pointList.push(X);		
					this.pointList.push(Y);
					this.drawLine('move');	
			}

			this.layer.draw();
		}
	}
	
	endStroke(X: number, Y: number) {
					
		if( this.toolset == 'pencil' || this.toolset == 'eraser') {
			this.pointList.push(X);			
			this.pointList.push(Y);
			this.drawLine('end');
			
			// Adding event to board history;
			this.historyService.addTask(this.toolset, 'yesman', this.pointList)
			console.log('Draw Service : Update Layer : ', this.layer)
		}		

		// Emptying the pointList and deleting line object;

		this.stroke = false;
		this.layer.draw()
		delete this.line;
		this.pointList = [];
					
		//	console.log("Draw Service: endStroke", X, Y, this.pointList);
	}
	
	clear() {
			this.layer.destroyChildren();
			this.layer.draw();		
			console.log('Draw Service Clear');
	}
	
	undo() {
		let deleteKey = this.layer.children.length - 1; 
		
		if(deleteKey >= 0) {
		
			let lastEvent = this.historyService.undo();
			console.log('Draw Service Deleting Children', this.layer.children);
			delete this.layer.children[deleteKey];
			this.layer.children.length--;
			console.log('Draw Service Deleting Children Done', this.layer.children);
		
		}
		else {
			console.log('Draw Service Undo Stack Empty');
			
		}
			
		this.layer.draw();
	}

	redo() {
			let doAgain = this.historyService.redo();

			if(doAgain !== undefined) {
			console.log('Draw Service : redo', doAgain);
			let taskName = doAgain.getTaskInfo();

			if(taskName['task-name'] == 'pencil' || taskName['task-name'] == 'eraser') {
				let eraser = (taskName['task-name'] == 'eraser');
				this.drawLine('start', eraser, taskName['task-coordinate-list']);
				this.layer.add(this.line);
			}
			
			this.layer.draw();
			console.log('Draw Service : Redo', taskName);
			}
			else {
				console.log('Draw Service : Redo nothing to do');	
			}
	}

	addImage( imgFile : File) {
		console.log("Draw Image File :", imgFile);
		let imgLoader : FileReader = new FileReader();

		let img = new Image();
		img.onload = (e) => {
			var k = new Konva.Image({
				x: 50,
				y: 50,
				image: img,
				//width: 500,
				pixelRatio: 0.2,
				//height: 500,
			});

			this.layer.add(k);
			this.layer.batchDraw();
		}

		imgLoader.onloadend = (e) => {
			console.log('Draw Service Loading file :', imgLoader.result, imgLoader);
			console.log(typeof imgLoader.result, typeof img.src, img)
			img.src = String(imgLoader.result);
		}

		imgLoader.readAsDataURL(imgFile);
	
	}

	private setTool() {
		this.stroke_color = this.docConfig.getStrokeColor();
		this.stroke_thickness = this.docConfig.getStrokeThickness();
		this.toolset = this.docConfig.getToolset();	
		this.stroke = true;
	}			
				
	private drawLine(eventType : string, eraser : boolean = false, pointList = this.pointList, color = this.stroke_color, thickness = this.stroke_thickness) {
			if (eventType === 'start') {
				
				this.line = new Konva.Line({
						points: pointList,
						stroke: color,
						strokeWidth: thickness,
						lineCap: 'round',
						lineJoin: 'round',
						tension: 0.5,
						globalCompositeOperation: 
								eraser ? 'destination-out': 'source-over',
				});
			} 
			else if (eventType === 'move' || eventType === 'end') {
				this.line.points(this.pointList);			
			}
	}
}	
