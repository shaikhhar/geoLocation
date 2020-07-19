import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  { path: '', redirectTo: 'page1', pathMatch: 'full' },
  {
    path: 'page1',
    loadChildren: () =>
      import('./component/page1/page1.module').then((m) => m.Page1Module),
  },
  {
    path: 'page2',
    loadChildren: () =>
      import('./component/page2/page2.module').then((m) => m.Page2Module),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDP92SuquMXgdjz1VrPTg7JY5lkC4PYMXI',
    }),
  ],
  exports: [RouterModule, AgmCoreModule],
})
export class AppRoutingModule {}
