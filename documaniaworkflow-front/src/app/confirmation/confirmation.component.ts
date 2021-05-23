import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusComponent } from '../components/status/status.component';
import { CamundaRestService } from '../services/rest/camunda-rest.service';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Input() taskId
  constructor(/*private status :StatusComponent*/ public activeModal : NgbActiveModal, private camundaRestService: CamundaRestService) { }

  ngOnInit(): void {
  }
 
  delete(taskid){
    this.camundaRestService.deleteProcess(taskid).subscribe(items=>{
      this.activeModal.dismiss();
    })
  }

}
