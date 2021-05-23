import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CamundaRestService } from 'src/app/services/rest/camunda-rest.service';
import { BpmnEditorComponent } from 'ng-bpmn';


@Component({
  selector: 'app-viewbpmn',
  templateUrl: './viewbpmn.component.html',
  styleUrls: ['./viewbpmn.component.css']
})
export class ViewbpmnComponent implements OnInit,AfterViewInit {

  @Input() key;
  bpmnXml = null;
  isLoaded = false;
  options = {
    editable: false,
  };
  @ViewChild('ucBpmn', {static:false}) ucBpmn: BpmnEditorComponent;
  constructor(private camundaRestService: CamundaRestService) {





  }
 async ngAfterViewInit() {
  
  }

  ngOnInit(): void {

    this.camundaRestService.getPbmnViewer(this.key).subscribe(res => {



      this.bpmnXml = res.bpmn20Xml;

      this.ucBpmn.loadXml( this.bpmnXml );
      this.isLoaded=true;
    })



  }


}
