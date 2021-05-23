import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamundaRestService } from 'src/app/services/rest/camunda-rest.service';

@Component({
  selector: 'app-start-new-process',
   templateUrl: './start-new-process.component.html',
  //template: "<formio (submit)='submited({e :$event,en:1})' (beforeSubmit)='submited({e :$event,en:2})' src='https://wuomzrynofxfhge.form.io/startnewjob'></formio>",
  styleUrls: ['./start-new-process.component.css']
})
export class StartNewProcessComponent implements OnInit {


  isSubmited = false;
  test:any;
  isLoading=true;
  variableForm
  processDefinitionKey
  model;
  submitVariablesForm = {variables : {}}

  submited(e)
  {
    console.log(e);
    
  }

  constructor(private camundaRestService: CamundaRestService,private route : ActivatedRoute) { 
   


    this.route.params.subscribe(params => {
      this.processDefinitionKey = params['processdefinitionkey'];
      
      this.camundaRestService.getStratFormVariables(this.processDefinitionKey).subscribe(res=>{

          this.variableForm = res;
          this.generateFormModel()
          
      })
    });



  }


  generateFormModel()
  {
   
    this.submitVariablesForm.variables = this.variableForm
    this.model = []
    let i =0;
    console.log(Object.keys(this.variableForm))
   Object.keys(this.variableForm).forEach((key)=>{
    

    

    this.model[i] = { key : key, value : this.variableForm[key].value, type : this.variableForm[key].type     }
     i++;



   })

   
     
    this.isLoading = false;
     


    
  }


  ngSubmit(){

    this.camundaRestService.postProcessInstance(this.processDefinitionKey,this.submitVariablesForm).subscribe(res=>{

    this.isSubmited = true;
  })



  }


  ngOnInit(): void {

    


  }
  



}
