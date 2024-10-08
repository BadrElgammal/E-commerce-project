import { Component } from '@angular/core';
import { NgIconComponent,provideIcons} from '@ng-icons/core'
import { heroClock } from '@ng-icons/heroicons/outline'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders:[provideIcons({heroClock})],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
