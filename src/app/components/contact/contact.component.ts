import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };
  
  onSubmit(form: NgForm) {
    alert('thanks for your response');
    form.reset(); // ✅ This resets the whole form and clears inputs
  }
}
