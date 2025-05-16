import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toster.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toaster',
  imports: [NgIf],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {
  toast = inject(ToastService);
}
