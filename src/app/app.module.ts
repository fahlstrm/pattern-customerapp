import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { MapComponent } from './components/map/map.component';
import { StartDialogComponent } from './components/dialogs/start-dialog/start-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FinishSnackbarComponent } from './components/dialogs/finish-snackbar/finish-snackbar.component';
import { ParkDialogComponent } from './components/dialogs/park-dialog/park-dialog.component';
import { EndDialogComponent } from './components/dialogs/end-dialog/end-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StartDialogComponent,
    HeaderComponent,
    ParkDialogComponent,
    FinishSnackbarComponent,
    EndDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LeafletModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
