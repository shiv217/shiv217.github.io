$(document).ready( function() {
	$(".error").hide(); 

	$("body").on("click",".button",function(e) {
		//prevent form from submitting
		e.preventDefault();	
		
		var labelsArray=["name","email","subject","info"];

		var toSend=checkNull(labelsArray);
		
		if(toSend.valError==1){	
		
			$.ajax({
				type:'post',
				url:'mail.php',
				data:{name: toSend.name,email: toSend.email,subject: toSend.subject,phone: toSend.phone,info: toSend.info},
				dataType:'text json',
				//on successful call
				success: function(data){
				//alert(data.error);
				//if no error happened change the content to the thank you page
				if(data.error==1){
				$('.content1').fadeOut(300, function() {
					$('.content1').load("content5.html").fadeIn(300);
					//var iframe = document.createElement('iframe'); 
					//iframe.style.width = '0px';
					//iframe.style.height = '0px';
					//document.body.appendChild(iframe);
					//iframe.src = 'conversion.html';	
				})
									
				}else{
				//if there was an error display error message 
				$('.content1').fadeOut(300, function() {
				$('.content1').html("<p>We're Sorry, there was an error submitting your message.<br>Please contact us at <a href='mailto:sumer@34investments.com'>sumer@34investments.com</a></p>").fadeIn(300);
				})
				}
				
				},
				error: function(){
				//if there was an error display error message 
				$('.content1').fadeOut(300, function() {
				$('.content1').html("<p>We're Sorry, there was an error submitting your info.2<br>Please contact us at <a href='mailto:sumer@34investments.com'>sumer@34investments.com</a></p").fadeIn(300);
				})
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

