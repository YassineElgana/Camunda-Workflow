import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamundaRestService } from 'src/app/services/rest/camunda-rest.service';

@Component({
  selector: 'app-approve-data-task',
  templateUrl: './approve-data-task.component.html',
  styleUrls: ['./approve-data-task.component.css']
})
export class ApproveDataTaskComponent implements OnInit {
  isSubmited = false;

  isLoading = true;
  variableForm
  model;
  submitVariablesForm = { variables: {} }

  constructor(private route: ActivatedRoute, private camundaRestService: CamundaRestService) { }
  taskId
  checked = false;


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.taskId = params['taskid'];

      this.camundaRestService.getTaskKeyVariables(this.taskId).subscribe(res => {

        this.variableForm = res;
        this.generateFormModel()

      })






      // const variables = this.generateVariablesFromFormFields();
      // this.camundaRestService.postProcessInstance(processDefinitionKey, variables).subscribe();
      // this.submitted = true;
    });
  }

  generateFormModel() {

    this.submitVariablesForm.variables = this.variableForm
    this.model = []
    let i = 0;
    console.log(Object.keys(this.variableForm))
    Object.keys(this.variableForm).forEach((key) => {




      this.model[i] = { key: key, value: this.variableForm[key].value, type: this.variableForm[key].type }
      i++;



    })



    this.isLoading = false;




  }

  ngSubmit(){

   if(!this.checked)
   return
   
    this.camundaRestService.postCompleteTask(this.taskId,this.submitVariablesForm).subscribe(res=>{

      this.isSubmited = true;
  
  
  
      })


  }
}


