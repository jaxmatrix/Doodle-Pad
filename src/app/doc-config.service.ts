import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocConfigService implements OnInit {
	// TODO : create config for page
	// TODO : transfer everything to different structure
					
	stroke_thickness = 10;
	stroke_color = 'red';
	height = 600;
	width = 800;
	backgroundColor = 'white';
	drawingBoardChanges: Subject<string> = new Subject<string>();
	toolset = 'pencil';

	constructor(
		
	) {
	}

	ngOnInit() {
				this.drawingBoardChanges.next(this.backgroundColor);
	}
	
	setStrokeThickness(thickness) {
		this.stroke_thickness = thickness;
		console.log("Service DocConfig Thickness: ", this.stroke_thickness);
	}

	setStrokeColor(color) {
		this.stroke_color = color;
		console.log("Service DocConfig Color: ", this.stroke_color);
	}
	
	getStrokeColor() {
		return this.stroke_color;
	}

	getStrokeThickness() {
		return this.stroke_thickness;
	}
	
	setHeight(height) {
		this.height = height;
	}			

	setWidth(width) {
		this.width = width;
	}
				
	getHeight() {
		return this.height;
	}
	
	getWidth() {
		return this.width;
	}

	setBackgroundColor(color) {
			this.backgroundColor = color;
			this.drawingBoardChanges.next(color);
			console.log('Doc Config set background color:', this.backgroundColor)
	}

	getBackgroundColor(): Observable<string> {
		return this.drawingBoardChanges.asObservable();			
	}
	
	getBackgroundColorStatic(){
		return this.backgroundColor;
	}
	
	setToolset(toolName : string) {
		this.toolset = toolName;
		console.log('Doc Config set toolname', this.toolset);
	}

	getToolset() {
		return this.toolset
	}

}
