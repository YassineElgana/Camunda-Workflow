import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaRestService } from 'src/app/services/rest/camunda-rest.service';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.css']
})
export class StartProcessComponent implements OnInit {

  private processDefinitionKey: String = null;
  formKey: string = null;
  private rootViewContainer = null;
  htmlBlob;
  isLoadding: boolean = true;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private camundaRestService: CamundaRestService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if (this.route.params != null) {
      this.route.params.subscribe(params => {
        this.processDefinitionKey = params['processdefinitionkey'];
        this.loadTaskKey();
      });
    }
  }

  loadTaskKey(): void {
    this.camundaRestService.getProcessDefinitionTaskKey(this.processDefinitionKey)
      .subscribe(formKey => {
        this.formKey = formKey.key
      //   this.camundaRestService.renderStartForm(this.formKey.split(":engine/")[1]).subscribe(form => {



      //  //   this.createForm(form);

      //   }, err => {





      //   })
      });
  }

  createForm(renForm) {

    let blob;
    let html = `
     <!doctype html>
    <html ng-app>
    <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.0.4/css/bootstrap-combined.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui/0.4.0/angular-ui.min.js" integrity="sha512-ZXKusD2lwWD1ps7HLBi6uSz4kQybpgds/n7EWE8UaV13cDSsSG/wKatShUru1ziaAFpbY5qHxybWldr6afN3Kw==" crossorigin="anonymous"></script>
   
 

    </head>
    <body>
    ${renForm}
    </body>   <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"
    integrity="sha256-xNjb53/rY+WmG+4L6tTl9m6PpqknWZvRt0rO1SRnJzw="
    crossorigin="anonymous"></script>
    </html>
     `
    blob = new Blob([html], { type: 'text/html' });
    this.htmlBlob = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));

    setTimeout(() => {
      this.isLoadding = false;
    }, 500);




  }



}
