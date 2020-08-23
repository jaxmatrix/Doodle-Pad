import { Directive } from '@angular/core';
import { HostListener, ElementRef, Renderer } from '@angular/core'; 
import { DrawService } from './draw.service';

@Directive({
	selector: '[appStroke]',

})

export class StrokeDirective {
	
	callTime: number;
	newTime: number;
	delay: number = 10;

	constructor(private draw: DrawService, private el: ElementRef, private renderer: Renderer) { }

	@HostListener('mousedown', ['$event']) startStroke(event : any) {
		let X = event.layerX;
		let Y = event.layerY;
		
		this.callTime = new Date().getTime()
		//		console.log('Stroke Directive Checking Time 0',this.newTime,  this.callTime)
		this.draw.startStroke(X,Y);
		//console.log('Stroke Directive Down: EVENT', event);
	}

	@HostListener('mousemove', ['$event']) appendStroke(event: any) {
	
		let X = event.layerX;
		let Y = event.layerY;
		
		this.newTime = new Date().getTime()
		//console.log('Stroke Directive Checking Time 1', this.newTime, this.callTime);
					
		if (this.newTime - this.callTime >= this.delay ){
			this.draw.makeStroke(X,Y);
			//console.log('Stroke Directive Move: EVENT', event);
			delete this.newTime;
		}
		
		this.callTime = this.newTime;
	}

	@HostListener('mouseup', ['$event']) endStroke(event: any) {
	
		let X = event.layerX;
		let Y = event.layerY;

		this.draw.endStroke(X,Y);
		//console.log('Stroke Directive Up: EVENT', event);
	}
}
