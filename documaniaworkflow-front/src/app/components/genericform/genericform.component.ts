import { Component, OnInit,
  ViewChild, ViewContainerRef,
  ComponentFactoryResolver,
  OnChanges, SimpleChange, Input, SimpleChanges } from '@angular/core';
import { ApproveDataTaskComponent, MyAddonModule, StartNewProcessComponent } from 'src/app/myprocess/my-addon/my-addon.module';

enum JOBS {
  STAR_NEW_PROCESS = "SNP",
  DO_TASK = "TD"
}

@Component({
  selector: 'app-genericform',
  templateUrl: './genericform.component.html',
  styleUrls: ['./genericform.component.css']
})
export class GenericformComponent implements OnChanges {
   



   @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef
   @Input() formKey = null;
   @Input() taskId = null;
   private rootViewContainer : ViewContainerRef = null;
   private myAddonModule = null;
 
   
  constructor(private factoryResolver: ComponentFactoryResolver) { }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
     console.log(changes);
     
    for (let propName in changes) {
      if (propName === 'formKey' && changes[propName].currentValue != null) {
        this.loadForm(changes[propName].currentValue,JOBS.STAR_NEW_PROCESS);
      }
      else if(propName ==='taskId'){
   
        this.loadForm(changes[propName].currentValue,JOBS.DO_TASK);
          

        
      }
    }
  }

  loadForm(formKey: String,job): void {
    this.setRootViewContainerRef(this.viewContainerRef);
    this.addDynamicComponent(formKey,job);
  }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  public addDynamicComponent(formKey: String,job) {
    console.log(MyAddonModule)
    console.log(formKey)


    if (job === JOBS.STAR_NEW_PROCESS) {
      const factory = this.factoryResolver.resolveComponentFactory(StartNewProcessComponent)
      const component = factory.create(this.rootViewContainer.parentInjector)
       this.rootViewContainer.clear()
      this.rootViewContainer.insert(component.hostView)
    } else {
      const factory = this.factoryResolver.resolveComponentFactory(ApproveDataTaskComponent)
      const component = factory.create(this.rootViewContainer.parentInjector)
       this.rootViewContainer.clear()
      this.rootViewContainer.insert(component.hostView)
    }

  }

 

}
