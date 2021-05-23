import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

let BASE_URL = environment.CAMUNDA_URL


@Injectable({
  providedIn: 'root'
})
export class CamundaRestService {
  getPbmnViewer(processDefinitionKey: any) {
    const url = `${this.engineRestUrl}process-definition/key/${processDefinitionKey}/xml`;
    return this.http.get<any>(url).pipe(
      tap(form => this.log(`fetched xml`)),
      catchError(this.handleError('getProcessDeifnitionxml', []))
    );
  }

  





private engineRestUrl;
  constructor(private http:HttpClient) { 
    this.engineRestUrl = BASE_URL
  }


  getProcessDefinitionTaskKey(processDefinitionKey): Observable<any> {
    const url = `${this.engineRestUrl}process-definition/key/${processDefinitionKey}/startForm`;
    return this.http.get<any>(url).pipe(
      tap(form => this.log(`fetched formkey`)),
      catchError(this.handleError('getProcessDeifnitionFormKey', []))
    );
  }

  getTaskKeyVariables(taskId): Observable<any> {
    const url = `${this.engineRestUrl}task/${taskId}/variables`;
    return this.http.get<any>(url).pipe(
      tap(form => this.log(`fetched TaskKeyVariables`)),
      catchError(this.handleError('geTaskKeyVariables', []))
    );
  }


  getInformationInstance(processId:any): Observable<any>{
    const url = `${this.engineRestUrl}history/process-instance/count?processDefinitionKey=${processId}`;
    return this.http.get<any>(url).pipe(
      tap(form => this.log(`fetched TaskKeyVariables`)),
      catchError(this.handleError('geTaskKeyVariables', []))
    );
  }

  getInCountInstanceActive(processId:any): Observable<any>{
    const url = `${this.engineRestUrl}history/process-instance/count?active=true&processDefinitionKey=${processId}`;
    return this.http.get<any>(url).pipe(
      tap(form => this.log(`fetched TaskKeyVariables`)),
      catchError(this.handleError('geTaskKeyVariables', []))
    );
  }

  getInCountInstanceCompleted(processId:any): Observable<any>{
    const url = `${this.engineRestUrl}history/process-instance/count?completed=true&processDefinitionKey=${processId}`;
    return this.http.get<any>(url).pipe(
      tap(form => this.log(`fetched TaskKeyVariables`)),
      catchError(this.handleError('geTaskKeyVariables', []))
    );
  }

   getProcessDefinitions(maxResults:any,firstResult:any): Observable<any> {
    return this.http.get<any>(this.engineRestUrl + `process-definition?latestVersion=true&maxResults=${maxResults}&firstResult=${firstResult}`).pipe(
      tap(processDefinitions => this.log(`fetched processDefinitions`)),
      catchError(this.handleError('getProcessDefinitions', []))
    );
  }
     

  
  deployProcess(fileToUpload: File): Observable<any> {
    const endpoint = `${this.engineRestUrl}deployment/create`;
    const formData = new FormData();


    formData.append("deployment-name",fileToUpload.name)
    formData.append("enable-duplicate-filtering","0")
    formData.append('*', fileToUpload);

    return this.http.post(endpoint, formData);
  }

  renderStartForm(arg0: string) {
   const endPoint = this.engineRestUrl + arg0
   return this.http.get(endPoint,{responseType: 'text'}).pipe(
    tap(StartForm => this.log(`fetched StartForm`)),
    catchError(this.handleError('getStartForm', []))
  );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    
  }

 getStratFormVariables(key) 
 {
  
  const endpoint = `${this.engineRestUrl}process-definition/key/${key}/form-variables`;
  return this.http.get<any>(endpoint).pipe(
    tap(form => this.log(`form-variables`)),
    catchError(this.handleError('form-variables', []))
  );
 
 }

startTask(): Observable<any>{
  var headers = new Headers();
  const endpoint = `${this.engineRestUrl}process-definition/key/Pro3/start`;
  return this.http.post<any>(endpoint,{ headers: headers}).pipe(
    tap(form => this.log(`fetched tasks`)),
    catchError(this.handleError('getTasks', []))
  );
}
   

search(valueSearch:any,returnAllInSearchOrNot:any=""){

 var headers = new Headers();
  const endpoint = `${this.engineRestUrl}task?nameLike=${valueSearch}%&${returnAllInSearchOrNot}`;
  return this.http.get<any>(endpoint).pipe(
    tap(form => this.log(`fetched tasks`)),
    catchError(this.handleError('getTasks', []))
  );

}

searchProcess(valueSearch:any,returnAllInSearchOrNot:any=""){

  var headers = new Headers();
  const endpoint = `${this.engineRestUrl}process-definition?nameLike=${valueSearch}%&${returnAllInSearchOrNot}`;
  return this.http.get<any>(endpoint).pipe(
    tap(form => this.log(`fetched tasks`)),
    catchError(this.handleError('getTasks', []))
  );

}

sort(valueSearch){
  var headers = new Headers();
  const endpoint = `${this.engineRestUrl}task`;
  return this.http.post<any>(endpoint,{
    sorting:
    [{
    sortBy : "name",
    sortOrder : valueSearch,
    parameters:{
      variable : "name",
      type : "String"
    }}]
  }).pipe(
    tap(form => this.log(`fetched tasks`)),
    catchError(this.handleError('getTasks', []))
  );


}

  getCountUnassigned(){
    var headers = new Headers();
    const endpoint = `${this.engineRestUrl}task/count`;
    return this.http.post<any>(endpoint,{"unfinished":true,"unassigned":true,"withoutCandidateGroups":true}).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
  }

  getCountAssignedGroup(){
    var headers = new Headers();
    const endpoint = `${this.engineRestUrl}task/count`;
    return this.http.post<any>(endpoint,{"unfinished":true,"unassigned":true,"withCandidateGroups":true}).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );

  }
   getTheInformationAboutInstance(id:any){
    const endpoint = `${this.engineRestUrl}task?processDefinitionKey=${id}`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
   }
   
   getListOfUsers(){
    const endpoint = `${this.engineRestUrl}user`;
    console.log(endpoint)
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
   }

   setAssignee(idOfTask,idOfUser){
  const endpoint = `${this.engineRestUrl}task/${idOfTask}/assignee`; 
  return this.http.post<any>(endpoint,{"userId": idOfUser}).pipe(
    tap(form => this.log(`fetched tasks`)),
    catchError(this.handleError('getTasks', []))
  );
 
   }
  getCountDeployment(){
    const endpoint = `${this.engineRestUrl}deployment/count`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );

  }

  getCountProcessDefinitions(){
    const endpoint = `${this.engineRestUrl}process-definition/count?latestVersion=true`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
  }

  getCountDecisionDefinitions(){
    const endpoint = `${this.engineRestUrl}decision-definition/count?latestVersion=true`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
  }
  getCountCaseDefinitions(){
    const endpoint = `${this.engineRestUrl}case-definition/count?latestVersion=true`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
  }
    getGroupOfUser(idOfUser:any){
      const endpoint = `${this.engineRestUrl}group?maxResults=50&firstResult=0`;
      return this.http.post<any>(endpoint, {member:idOfUser , firstResult: 0, maxResults: 50}).pipe(
        tap(processDefinitions => this.log(`posted process instance`)),
        catchError(this.handleError('postProcessInstance', []))
      );
    }
   getGroupId(id:any){
    const endpoint = `${this.engineRestUrl}task/${id}/identity-links`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
   }

     getCountAssignedUser(){
      var headers = new Headers();
      const endpoint = `${this.engineRestUrl}task/count`;
      return this.http.post<any>(endpoint,{"unfinished":true,"assigned":true}).pipe(
        tap(form => this.log(`fetched tasks`)),
        catchError(this.handleError('getTasks', []))
      );
    
     }
    
      getTotalInstances(){
        const endpoint = `${this.engineRestUrl}task/count`;
      return this.http.get<any>(endpoint).pipe(
        tap(form => this.log(`fetched tasks`)),
        catchError(this.handleError('getTasks', []))
      );
    }

   getUserGroups(id:any): Observable<any> {
    const endpoint = `${this.engineRestUrl}identity/groups?userId=${id}`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
  }

  postTask(): Observable<any> {
    const endpoint = `${this.engineRestUrl}task?sortBy=created&sortOrder=desc`;
    return this.http.post<any>(endpoint, {"candidateGroups": JSON.parse(localStorage.getItem("groupsId") )}).pipe(
      tap(processDefinitions => this.log(`posted process instance`)),
      catchError(this.handleError('postProcessInstance', []))
    );
  }
  
  getTasks(maxResults,firstResult): Observable<any> {
    const endpoint = `${this.engineRestUrl}task?sortBy=created&sortOrder=desc&maxResults=${maxResults}&firstResult=${firstResult}`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
  }

  getTaskFormKey(taskId: String): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/form`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched taskform`)),
      catchError(this.handleError('getTaskFormKey', []))
    );
  }
  getProcessDefinitionCount(): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-definition/count`
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched taskform`)),
      catchError(this.handleError('getTaskFormKey', []))
    );
  }
  postProcessInstance(processDefinitionKey, variables): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-definition/key/${processDefinitionKey}/start`;
    return this.http.post<any>(endpoint, variables).pipe(
      tap(processDefinitions => this.log(`posted process instance`)),
      catchError(this.handleError('postProcessInstance', []))
    );
  }
   
  deleteProcess(id:any){
    const endpoint = `${this.engineRestUrl}/task/${id}`;
    return this.http.delete<any>(endpoint).pipe(
      tap(processDefinitions => this.log(`posted process instance`)),
      catchError(this.handleError('postProcessInstance', []))
    );
  }
  postCompleteTask(taskId, variables): Observable<any> {

    const endpoint = `${this.engineRestUrl}task/${taskId}/complete`;

    return this.http.post<any>(endpoint, variables).pipe(
      tap(processDefinitions => this.log(`posted process instance`)),
      catchError(this.handleError('postProcessInstance', []))
    );
  }



}
