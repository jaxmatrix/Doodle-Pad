import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { DocConfigService } from '../doc-config.service';
import { HostListener, Directive, ElementRef, Renderer } from '@angular/core';
import { StrokeDirective } from '../drawing/stroke.directive';
import { DrawService } from '../drawing/draw.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss']
})

export class DrawingBoardComponent implements OnInit {
				
	stage : Konva.Stage;
	layer : Konva.Layer;
	backgroundColorListner$ : Subscription;
	backgroundColor : string = 'white';

	constructor(
		private draw: DrawService, 
		private docConfig : DocConfigService, 
		private el: ElementRef,
		private renderer: Renderer
	) { 
		this.backgroundColorListner$ = this.docConfig.getBackgroundColor().subscribe((color) => {
			this.backgroundColor = color;
			console.log('Drawing Board Background Color Subscription:', this.backgroundColor);			
			this.setBackgroundColor();	
		})
	}

	ngOnInit() {
		this.setBackgroundColor();

		this.stage = new Konva.Stage({
			container:'drawingBoard',
			height: this.docConfig.getHeight(),
			width: this.docConfig.getWidth(),
		})

		this.layer = new Konva.Layer();
		let height = this.el.nativeElement.offsetHeight;
		let width = this.el.nativeElement.offsetWidth;
					
		this.stage.width(width);
		this.stage.height(height);
		//		console.log("Drawing Board : Element Size ", height, width);

		this.stage.add(this.layer)
		this.draw.setPage(this.stage, this.layer);
	}
	
	setBackgroundColor() {
		let board = this.el.nativeElement;
		this.renderer.setElementStyle(board, 'backgroundColor', this.backgroundColor);
	}

}
