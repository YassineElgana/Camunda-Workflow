import { Component, Input, OnInit } from '@angular/core';
import { StatusComponent } from './status.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./status.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Input() taskId
  constructor(private status :StatusComponent) { }

  ngOnInit(): void {
  }
  closeModal(){
    this.status.closeModal();
  }
}
