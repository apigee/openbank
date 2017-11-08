function getJsonWebToken(header, payload)
{
var xhttp = new XMLHttpRequest();
  xhttp.open("GET", Drupal.settings.basePath + "ajax/getJWT?header="+JSON.stringify(header)+"&payload="+JSON.stringify(payload), false);
  //var params = "grant_type=client_credentials&scope="+ localStorage.ccScope; 
var responseText = null;

xhttp.send(null);
  /*xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) 
    {
     responseText = this.responseText;
    // alert("yooo");
    // alert(responseText);
      responseText;
    }
    else if(this.readyState == 4 )
    {
    //ResetAndCancel();
    //showError("Error getting JWT");

    }
  };*/
  if(xhttp.status == 200)
  {
   
   responseText = xhttp.responseText;
  }
  
return responseText;

}