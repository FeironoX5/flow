import { Routes } from '@angular/router';
import { SectionedPageLayoutComponent } from './app/view/ui/sectioned-page-layout/sectioned-page-layout.component';
import {
  FlowPageComponent,
  FlowPageHeaderComponent,
  FlowPageSideComponent,
} from './app/view/pages/flow/flow.component';
import {
  DataDisplayComponent,
  DataDisplayHeaderComponent,
} from './app/view/pages/data-display/data-display.component';

export const routes: Routes = [
  {
    path: '',
    component: SectionedPageLayoutComponent,
    children: [
      {
        path: 'flow',
        children: [
          { path: '', component: FlowPageComponent },
          { path: '', outlet: 'header', component: FlowPageHeaderComponent },
          { path: '', outlet: 'side', component: FlowPageSideComponent },
        ],
      },
      {
        path: 'data-display',
        children: [
          { path: '', component: DataDisplayComponent },
          { path: '', outlet: 'header', component: DataDisplayHeaderComponent },
        ],
      },
      { path: '**', redirectTo: '/flow', pathMatch: 'full' },
    ],
  },
];
