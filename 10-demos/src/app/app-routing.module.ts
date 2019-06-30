import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatabindingComponent} from './01-basics/01-databinding/databinding.component';
import {StructuralDirectivesComponent} from './01-basics/02-structural-directives/structural-directives.component';
import {ParentComponent} from './01-basics/03-nested-components/parent.component';
import {ServiceConsumerComponent} from './01-basics/05-service/service-consumer.component';
import {LifecycleParentComponent} from './01-basics/04-lifecycle/lifecycle-parent.component';
import {BackendModule} from './03-BackendAccess/backend.module';

function getBakcenModule() {
  return BackendModule;
}

const routes: Routes = [
  {path: 'databinding', component: DatabindingComponent},
  {path: 'structural-directives', component: StructuralDirectivesComponent},
  {path: 'nested-components', component: ParentComponent},
  {path: 'lifecycle', component: LifecycleParentComponent},
  {path: 'service', component: ServiceConsumerComponent},

  // Note: The forms module brings its own route configuration
  // It would be nice to have "consistent" API which allows using 'loadChildren' without lazy loading like this:
  // {path:'forms', loadChildren: () => FromsModule}
  // But this does not work. See:
  // https://github.com/angular/angular-cli/issues/4192
  // https://github.com/angular/angular/issues/21170

  {path: 'backend', loadChildren: () => import('./03-BackendAccess/backend.module').then(m => m.BackendModule)},
  {path: 'routing', loadChildren: () => import('./04-routing/routing.module').then(m => m.RoutingModule)},
  {path: 'ui-constructs', loadChildren: () => import('./05-ui-constructs/ui-constructs.module').then(m => m.UiConstructsModule)},
  {path: 'dependency-injection', loadChildren: () => import('./10-dependency-injection/dependency-injection.module').then(m => m.DependencyInjectionModule)},
  {path: 'change-tracking', loadChildren: () => import('./20-change-tracking/change-tracking.module').then(m => m.ChangeTrackingModule)},
  {path: 'component-patterns', loadChildren: () => import('./30-component-patterns/component-patterns.module').then(m => m.ComponentPatternsModule)},
  {path: 'internationalization', loadChildren: () => import('./60-internationalization/internationalization.module').then(m => m.InternationalizationModule)},
  {path: '**', redirectTo: 'databinding'}, // default route
];


@NgModule({
  imports: [RouterModule.forRoot(routes /*, { enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


