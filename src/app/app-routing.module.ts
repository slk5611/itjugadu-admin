import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PostComponent} from './pages/post/post.component';
import {ContactComponent} from './pages/contact/contact.component';
import {SubscriberComponent} from './pages/subscriber/subscriber.component';
import {CommentComponent} from './pages/comment/comment.component';
import {MetadataComponent} from './pages/metadata/metadata.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'post', component: PostComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'subscriber', component: SubscriberComponent},
  {path: 'comment/:id', component: CommentComponent},
  {path: 'metadata', component: MetadataComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
