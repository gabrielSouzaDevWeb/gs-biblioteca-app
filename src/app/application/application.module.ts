import { WelcomeComponent } from './pages/main/welcome.component';
import { WelcomeModule } from './pages/main/welcome.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule],
})
export class ApplicationModule {}
