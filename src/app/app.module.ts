import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import {HomeComponent} from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SubscriberComponent } from './pages/subscriber/subscriber.component';
import { CommentComponent } from './pages/comment/comment.component';
import { MetadataComponent } from './pages/metadata/metadata.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    PostComponent,
    ContactComponent,
    SubscriberComponent,
    CommentComponent,
    MetadataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
