import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { MapComponent } from './components/map/map.component';
import { StartDialogComponent } from './components/start-dialog/start-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ParkDialogComponent } from './components/park-dialog/park-dialog.component';
import { FinishSnackbarComponent } from './components/finish-snackbar/finish-snackbar.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StartDialogComponent,
    HeaderComponent,
    ParkDialogComponent,
    FinishSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
