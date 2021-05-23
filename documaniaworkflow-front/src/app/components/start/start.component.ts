import { HomeComponent } from './../home/home.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamundaRestService } from 'src/app/services/rest/camunda-rest.service';
import { ViewbpmnComponent } from '../viewbpmn/viewbpmn.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  processDefinitions;
   page:number=1;
   totalRecordes:number;
  pageCalc:number=0;

  constructor(private camundaRestService: CamundaRestService,private modal : NgbModal,private home:HomeComponent) { 
    this.home.checkInHome=false
    console.log(this.home.checkInHome,'s')}

  ngOnInit() {
    this.getProcessDefinitions(5,0);
  }

  getProcessDefinitions(maxResults:any,firstResult:any): void {
    this.camundaRestService
      .getProcessDefinitions(maxResults,firstResult)
      .subscribe(processDefinitions =>{ 
      
        this.processDefinitions = processDefinitions;
        this.camundaRestService.getCountProcessDefinitions().subscribe(items=>{
        this.totalRecordes =items.count;
        })

      });
  }

  sort(data,$event){
  
    if($event.target.value == 'asc')
      this.processDefinitions= data.sort((a, b) => (a.name < b.name ? -1 : 1));
      else 
      this.processDefinitions= data.sort((a, b) => (a.name > b.name ? -1 : 1));

   }
  
   Search(e){
    if(e.target.value == "")
    var  returnAllInSearch ="maxResults=5&firstResult=0"
    
    this.camundaRestService.searchProcess(e.target.value,returnAllInSearch).subscribe(data=>{
      this.processDefinitions=data
    })
   
   }

  getNextOrPreviousData(e){
   this.page =e;
  this.getProcessDefinitions(5,5*(e-1));
  (<HTMLInputElement>document.getElementById('select')).value='5';
  (<HTMLInputElement>document.getElementById('select2')).value='Sort';
  }

getChangedValue(e){
  this.getProcessDefinitions(e.target.value,this.pageCalc);
}
view(key)
{
 
 
  const viewbpmn = this.modal.open(ViewbpmnComponent)
  viewbpmn.componentInstance.key = key;
 setTimeout(this.callIt,0);
}
 
callIt(){

  var element = document.getElementsByClassName("bjs-container") as HTMLCollectionOf<HTMLElement>;
  var elemnts1 = document.getElementsByClassName("modal-content") as HTMLCollectionOf<HTMLElement>;
  element.item(0).setAttribute('style','height: 300px');
  elemnts1.item(0).setAttribute('style','width:626px')
}

}
