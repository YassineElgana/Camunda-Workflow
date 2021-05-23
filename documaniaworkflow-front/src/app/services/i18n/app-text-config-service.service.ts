import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppTextConfigService {

  constructor(private http:HttpClient) { }
  public text : any={
    homePage : {
    title : "",
    guide : [
        "",
        "",
        ""
    ],
    btnLeft : "",
    btnRight : "",
    copyright : ""
    


  }
   ,
   ocr : {

    ar :"",
    en :"",
    fr :""
   }
};
  public lang;
  public isLoaded=false;
  local=""
  getConfigLang()
  {
    
    let p=localStorage.getItem("preferedlang")??'fr';
    if(p=="ar")
    {
      document.dir="rtl"
    }
    this.lang=p
    this.http.get<any>("assets/configs/documania-workflow-strings-"+p+".min.json").subscribe(res=>{
      
      this.text=res.strings;
      
  })


}
changeLanguage(lang)
{
  return this.http.get<any>("assets/configs/documania-workflow-strings-"+lang+".min.json")
}

getIformationforme(lang){
  return this.http.post<any>("assets/configs/documania-workflow-strings-"+lang+".min.json",{});
}

getLocalByLang():string{
if(this.lang=="ar")
  return "ar-SA"
else if(this.lang=="en")
return "en-US"
else
return "fr-FR"
}

}
