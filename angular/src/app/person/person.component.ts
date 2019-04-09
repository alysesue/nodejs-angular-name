import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {
  form: FormGroup;
  person: object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.form = new FormGroup ({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  submit = function(formData) {
    if (this.form.invalid) {
      return;
    }

    this.form.reset();

    this.person = {
      firstName: formData.firstName,
      lastName: formData.lastName
    };

    this.data.registerPerson(this.person)
      .subscribe(msg => {
        this.msg = msg.body;
        console.log(msg);
      });
  };

}
