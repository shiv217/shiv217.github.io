<?php
/*
*message send PHP file
*/
//set error to be passed. if no post error 2 is sent
$error=2;

function determineIfNull($variable)
{
		$variable=!empty($variable) ?"$variable" : "NULL";
		$variable=trim($variable);
		$variable=strip_tags($variable);
		return $variable;
}

if(isset($_POST['email'])) 
{
                $error=1;
                $name=determineIfNull($_POST['name']);
				$subject=determineIfNull($_POST['subject']);
				$email=determineIfNull($_POST['email']);
				$info=determineIfNull($_POST['message']);
                
				$to = "srawal.217@gmail.com";
				$headers = array();
                $headers[] = "MIME-Version: 1.0/n";
                $headers[] = "Content-type: text/html; charset=iso-8859-1/n";
                $headers[] = "From: $email";
                $subject="$subject";
                $message="
				Name: $name <br><br>

				$info
				";
                $message = html_entity_decode($message);

                mail($to, $subject, $message, implode("\n", $headers));
                                                                          
}
               

$returnArray= array();

$returnArray["error"]=$error;
echo json_encode($returnArray);
 
?>