import { Component, OnInit } from '@angular/core';
import { DocConfigService } from '../doc-config.service';
import { DrawService } from '../drawing/draw.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})

export class ToolBarComponent implements OnInit {
	strokeSizes: Array<number> = [2, 4, 6, 8, 10, 14, 16, 20, 24, 30, 36, 40];			
	strokeColors: Array<string> = [
		'black',
		'red',
		'blue',
		'green',
		'yellow',
		'pink',
		'lightblue'
	];
	
	backgroundColors: Array<string> = [
		'white',
		'lightpink',
		'lightblue',
		'lightgreen',
		'black'
	];

	backgroundColor = 'white';
	strokeThickness = 6;
	strokeColor = 'black';
	toolset = 'pencil';
	
	constructor(
		private docConfig : DocConfigService,
		private draw : DrawService
	) { 
	}

  ngOnInit() {
		this.docConfig.setStrokeThickness(this.strokeThickness);
		this.docConfig.setStrokeColor(this.strokeColor);
		this.docConfig.setBackgroundColor(this.backgroundColor);
	
	}

	setStrokeThickness() {
			this.docConfig.setStrokeThickness(this.strokeThickness);
			console.log('Tool Bar Set Thickness', this.strokeThickness)
	}

	setStrokeColor() {
			this.docConfig.setStrokeColor(this.strokeColor);
			console.log('Tool Bar Set Color', this.strokeColor);
	}

	setBackgroundColor() {
			this.docConfig.setBackgroundColor(this.backgroundColor)
			console.log('Tool Bar Set Background Color', this.backgroundColor)
	}

	clearPage (){
			this.draw.clear();
			console.log('Tool Bar Clear Background');
	}

	changeToolset(toolname: string ) {
			this.toolset = toolname;
			this.docConfig.setToolset(this.toolset);
	}

	undo() {
		this.draw.undo();
	}
	
	redo() {
		this.draw.redo();
	}
	
	openImage( files: FileList ) {
		let imageFile = files.item(0);

		//Check file format 
		if( imageFile.type == 'image/png')
		{
			this.draw.addImage(imageFile);
		}
		console.log("Toolbar opening Files", files);
	}

}
