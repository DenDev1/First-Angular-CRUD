import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Declare the contactData object
  contactData = {
    name: '',
    email: '',
    message: ''
  };

  constructor() {}

  // Handle form submission
  onSubmit() {
    if (this.contactData.name && this.contactData.email && this.contactData.message) {
      console.log('Contact form submitted:', this.contactData);
      // Send the data to a server or show a success message
      alert('Thank you for contacting us!');
    } else {
      alert('Please fill in all the fields.');
    }
  }
}
