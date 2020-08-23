import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { DrawingBoardComponent } from './drawing-board/drawing-board.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { StrokeDirective } from './drawing/stroke.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    DrawingBoardComponent,
    StatusBarComponent,
    StrokeDirective
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
