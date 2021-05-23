import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaRestService } from 'src/app/services/rest/camunda-rest.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks = null;
  data;
  totalRecords:number;
  page:number=1;
  pageCalc:number=0;
  getOrder;
  taskId: String;
  formKey: String;
  idTasks:String;
  constructor(
    private camundaRestService: CamundaRestService,
    private route: ActivatedRoute,
    private router:Router) {

  }

  ngOnInit() {
    this.postTasks();
    this.getDeploymentCount();
    this.getTasks(5,0);
    if (this.route.params != null) {
      this.route.params.subscribe(params => {
        if (params['id'] != null) {
          this.taskId = params['id'];
          this.getFormKey();
        } else {
          this.getTasks(5,0);
        }
      });
    }
  }

  

  taskClick(id)
{
  
  this.taskId = id;
  this.router.navigateByUrl(`home/tasks/do/${id}`)
  
}
  getFormKey(): void {
    this.camundaRestService
      .getTaskFormKey(this.taskId)
      .subscribe(formKey => this.formKey = formKey.key);
  }
  
  
  getTasks(maxResults,firstResult): void {
    this.camundaRestService
      .getTasks(maxResults,firstResult)
      .subscribe((tasks)=>{
        this.data=tasks;
        (<HTMLInputElement>document.getElementById('select2')).value='Sort';
        this.camundaRestService.getTotalInstances().subscribe(Count =>
          this.totalRecords=Count.count
          )
      });
  }

getDeploymentCount(): void {
  this.camundaRestService.getProcessDefinitionCount().subscribe((count => {
    console.log(count);
  }))
}
  getData(e){
  
    this.page =e;
    this.pageCalc=5*(e-1);
    this.getTasks(5,5*(e-1));
   (<HTMLInputElement>document.getElementById('select')).value='5';
   (<HTMLInputElement>document.getElementById('select2')).value='Sort';
  }

sort(data,$event){
 this.getOrder =$event.target.value;
 if($event.target.value == 'asc')
   this.data= data.sort((a, b) => (a.name < b.name ? -1 : 1));
 else 
   this.data= data.sort((a, b) => (a.name > b.name ? -1 : 1));
  
}
  getChangedValue(e){
    this.getTasks(e.target.value,this.pageCalc);
  }

  Search(e){
    if(e.target.value == "")
   var  returnAllInSearch ="maxResults=5&firstResult=0"
    this.camundaRestService.search(e.target.value,returnAllInSearch).subscribe(data=>{
      console.log(data);
     this.data=data;
    })
   
   }
  postTasks():void{
    this.camundaRestService.postTask().subscribe((suc)=>
      this.tasks= suc
      
      );
  }
}
