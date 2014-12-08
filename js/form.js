$(document).ready( function() {
	$(".error").hide(); 

	$("body").on("click",".button button-style1",function(e) {
		//prevent form from submitting
		e.preventDefault();	
		
		var labelsArray=["name","email","subject","message"];

		var toSend=checkNull(labelsArray);
		
		if(toSend.valError==1){	
		
			$.ajax({
				type:'put',
				url:'mail.php',
				data:{name: toSend.name,email: toSend.email,subject: toSend.subject,message: toSend.message},
				dataType:'text json',
				//on successful call
				success: function(data){
				//alert(data.error);
				//if no error happened change the content to the thank you page
				if(data.error==1){
					alert("Thank you for your message!");
				}else{
					alert("Error sending your message, please use one of the otehr contact options to the right of the message box.");
				}
				
				},
				error: function(){
				//if there was an error display error message 
					alert("Error sending your message, please use one of the otehr contact options to the right of the message box.");
				}
			});
			
		}
	});
	
	function checkNull(labels){
		//create object to store variables 
		var sendAjax={};
		
		//set variable to tell partent function to send the ajax call or not
		var sendError=1;
		//get length of array
		var arrayLength=labels.length;
		
		//loop through elements
		for(var i=0;i<arrayLength;i++){
		
			//get value of element
			var value=$("#"+labels[i]).val();
			//console.log(value);
			//if nothing was entered make border red
			if(value=="" || value==" Name" || value=="Email" || value =="Subject"){
				$("#"+labels[i]).css("border-color","rgba(255,0,0,1)");
				//set variable to tell partent function to send the ajax call or not
				var sendError=2;
			}
			else{
				//if the label is an email check postion of @ and . to make sure its a valid email
				if(labels[i]=='email'){
				var atpos=value.indexOf("@");
				var dotpos=value.lastIndexOf(".");
				//input data must contain an @ sign and at least one dot (.). Also, the @ must not be the first character of the email address, 
				//and the last dot must be present after the @ sign, and minimum 2 characters before the end
					if (atpos<1 || dotpos<atpos+2 || dotpos+2>=value.length)
					{
						alert("Please enter a valid e-mail address");
						$("#"+labels[i]).css("border-color","rgba(255,0,0,1)");
						//set variable to tell partent function to send the ajax call or not
						var sendError=2;
					
					}
					else{
						//if email is valid
						$("#"+labels[i]).css("border-color","rgba(229,229,229,1)");
						sendAjax.email=value;
					}
				}//end if email
				else{ 
				$("#"+labels[i]).css("border-color","rgba(229,229,229,1)");
					
					
					if(labels[i]=="name"){
						sendAjax.name=value;
					}
					else if(labels[i]=='email'){
						sendAjax.email=value;
					}
					else if(labels[i]=='subject'){
						sendAjax.subject=value;
					}
					else if(labels[i]=='info'){
						sendAjax.info=value;
					}
				}
			}
			}//end for
			
		//set error value	
		sendAjax.valError=sendError;
			
	  return sendAjax;
		
	}
	
});

