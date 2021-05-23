import { HomeComponent } from './../home/home.component';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { CamundaRestService } from 'src/app/services/rest/camunda-rest.service';
import { ViewbpmnComponent } from '../viewbpmn/viewbpmn.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
 
  
  processDefinitions;
  keyOfInstance;
  countRuningInstance;
  countActiveInstance;
  countCompletedInstance;
  countUnassigned;
  countTotal;
  countAssignedToGroup;
  countAssignedToUser;
  countDeployement;
  countProcessDefinition;
  countDecisionDefinitions;
  countCaseDefinitions;
  allInformation;
  strTaskGroupIds;
  listOfUsers;
  theIdOfUser;
  checkVar=false;
  getGroupOfUser=new Array();
  stringGetGroupOfUser="";
  page:number=1;
  totalRecords:number;
  check:boolean=false;
  constructor(
    private camundaRestService: CamundaRestService,private modal : NgbModal,private home:HomeComponent
    
    ) {
      this.home.checkInHome=false
      console.log(this.home.checkInHome,'stau')}
   delete(item)
   {

    const id = item.id;
   const deleteRef = this.modal.open(ConfirmationComponent)
   deleteRef.componentInstance.taskId = id
 

   }

   closeModal(){
    
  }

  ngOnInit() {
    
    this.camundaRestService.getCountProcessDefinitions().subscribe(items=>{
        this.getProcessDefinitions(items.count,0);
    })

   
    this. informationDeployement();

   
    
  }

  getProcessDefinitions(maxResults:any,firstResult:any): void {
    this.camundaRestService
      .getProcessDefinitions(maxResults,firstResult)
      .subscribe(processDefinitions => {
        this.processDefinitions = processDefinitions;
      });
      }

      changeProcess(e){
        this.keyOfInstance = e.target.value;
        this.check=true
        this.camundaRestService.getInformationInstance(e.target.value).subscribe(Count =>
          this.countRuningInstance =Count.count
        );
        this.camundaRestService.getInCountInstanceActive(e.target.value).subscribe(Count =>{
          this.countActiveInstance=Count.count;
          console.log(this.countActiveInstance);
        });
        this.camundaRestService.getInCountInstanceCompleted(e.target.value).subscribe(Count =>
          this.countCompletedInstance =Count.count
        );
        this.camundaRestService.getCountUnassigned().subscribe(Count =>
          this.countUnassigned =Count.count
        );
        this.camundaRestService.getTotalInstances().subscribe(Count =>
          this.countTotal =Count.count
        );
        this.camundaRestService.getCountAssignedGroup().subscribe(Count =>
          this.countAssignedToGroup =Count.count
        );
        this.camundaRestService.getCountAssignedUser().subscribe(Count =>
          this.countAssignedToUser=Count.count
        );
        this.camundaRestService.getTheInformationAboutInstance(e.target.value).subscribe(items =>{
         
          this.allInformation=items;
          this.totalRecords = items.results.length;
        }); 
        
       this.camundaRestService.getListOfUsers().subscribe(ite=>{
        this.listOfUsers =ite;

        this.listOfUsers.forEach(element => {
          console.log(element.firstName)
          this.camundaRestService.getGroupOfUser(element.id).subscribe(items=>{
            this.stringGetGroupOfUser="";
            items.forEach(element2 => {
             
              this.stringGetGroupOfUser += element2.id+" "
            });
           this.getGroupOfUser.push(this.stringGetGroupOfUser)
          })
        });
       
    
       })
      }
  
  getTaskForAssignee(e,item){
     item.assigneeDraft=e.target.value
  }

 setAssigne2(item){
     this.camundaRestService.setAssignee(item.id,item.assigneeDraft).subscribe(items=>{
       
     (<HTMLInputElement>document.getElementById(item.id)).innerHTML=item.assigneeDraft
       item.assigneeDraft=null
     }) 
 }

  informationDeployement(){
    this.camundaRestService.getCountDeployment().subscribe(items=>{
     this.countDeployement=items.count;
    })
    this.camundaRestService.getCountProcessDefinitions().subscribe(items=>{
      this.countProcessDefinition =items.count;
    })
    this.camundaRestService.getCountDecisionDefinitions().subscribe(items=>{
      this.countDecisionDefinitions=items.count;
    })
    this.camundaRestService.getCountCaseDefinitions().subscribe(items=>{
     this.countCaseDefinitions =items.count;
    })
  }

sort(sortBy){
  console.log(sortBy,this.allInformation);
 
  this.allInformation = this.allInformation.sort((a, b) => (a.sortBy < b.sortBy ? -1 : 1));

}

  defineColor(dueDate:any):string{
    var firstDate = new Date();
    var seconDate = new Date(dueDate);
    var thirdDate = new Date('Thu Jan 01 1970 01:00:00 GMT+0100');
  
    if(firstDate < seconDate || ( (!(seconDate > thirdDate)) && (!(seconDate < thirdDate)) ))
         return "green"
    else if(firstDate > seconDate )
      return "red"
  } 
  view(key)
  {
    console.log("clicked");
    
    const viewbpmn = this.modal.open(ViewbpmnComponent)
    viewbpmn.componentInstance.key = key;}

}


  



 

 

