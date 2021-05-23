import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApproveDataTaskComponent } from 'src/app/myprocess/my-addon/my-addon.module';
import { CamundaRestService } from 'src/app/services/rest/camunda-rest.service';

@Component({
  selector: 'app-dotask',
  templateUrl: './dotask.component.html',
  styleUrls: ['./dotask.component.css']
})
export class DotaskComponent implements OnInit {


  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef
  @Input() formKey = null;
  taskId = null;
  private rootViewContainer : ViewContainerRef = null;
  private myAddonModule = null;
  
  



  constructor(private route: ActivatedRoute,
    private router: Router,
    private camundaRestService: CamundaRestService,
    private sanitizer: DomSanitizer,
    private factoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    
    if (this.route.params != null) {
      this.route.params.subscribe(params => {
        this.taskId = params['taskid'];
         

      });
    }
  }

  loadForm(formKey: String): void {
    this.setRootViewContainerRef(this.viewContainerRef);
    this.addDynamicComponent(formKey);
  }
 
  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }
 
  public addDynamicComponent(formKey: String) {
   //  console.log(MyAddonModule)
   //  console.log(formKey)

   console.log(this.viewContainerRef);
   
    const factory = this.factoryResolver.resolveComponentFactory(ApproveDataTaskComponent)
    const component = factory.create(this.rootViewContainer.parentInjector)
     this.rootViewContainer.clear()
    this.rootViewContainer.insert(component.hostView)
  }
  

}
