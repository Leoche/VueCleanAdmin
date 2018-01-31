<?php
header('Access-Control-Allow-Origin: *');
class VueCleanServer
{
   private $configuration;
   private $prettyJson = true;

   public function __construct()
   {
      // GET CONFIG
      $this->configuration = json_decode($this->retrieve_JSON('config'));

      // PROCEED ACTION
      if (!isset($_POST) || !isset($_POST["action"]) || $_POST["action"] === "") $this->error("Action not specified");
      switch ($_POST["action"]) {
         case "auth":
            if($this->getAuth())
               echo json_encode(array(
                  "state" => "success",
                  "data" => json_encode($this->getAuth())
               ));
            die();
         break;
         case "getmodel":
            if($this->validAuth())
               echo json_encode(array(
                  "state" => "success",
                  "data" => json_decode($this->retrieve_JSON('model'))
               ));
            die();
         break;
         case "getcontent":
               echo json_encode(array(
                  "state" => "success",
                  "data" => json_decode($this->retrieve_JSON('content'))
               ));
            die();
         break;
         case "setmodel":
            if($this->validAuth())
               if(!isset($_POST["body"]) || $_POST["body"] === "") $this->error("JSON not found");
                  if(!$this->save_JSON("model", $_POST["body"])) $this->error("JSON could not be saved");
                  else $this->success("Model saved");
         break;
         case "setcontent":
            if($this->validAuth())
               if(!isset($_POST["body"]) || $_POST["body"] === "") $this->error("JSON not found");
                  if(!$this->save_JSON("content", $_POST["body"])) $this->error("JSON could not be saved");
                  else $this->success("Content saved");
         break;
         default:
            $this->error("Action not valid");
         break;
      }
   }
   private function retrieve_JSON($filename) {
      $json = @file_get_contents("../".$filename.".json");
      if ($json === FALSE) $this->error("Can't access to the ".$filename.".json");
      else return $json;
   }
   private function save_JSON($filename, $body) {
      $json = json_decode($body);
      if (json_last_error() !== JSON_ERROR_NONE)  $this->error("Can't save a non JSON file");
      if (@file_put_contents("../".$filename.".json", $body) === FALSE) $this->error("Can't save to ".$filename.".json");
      else return true;
   }
   private function validAuth()
   {
      if(!$this->validIp()) return $this->error("Invalid host");
      if(!isset($_POST["email"]) || $_POST["email"] === "" || !filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
         return $this->error("Invalid email");
      } else {
         $inputEmail = $_POST["email"];
      }
      if(!isset($_POST["password"]) || $_POST["password"] === "") {
         return $this->error("Invalid password");
      } else {
         $inputPassword = $_POST["password"];
      }
      foreach($this->configuration->auth as $account) {
         if($inputEmail === $account->email) {
            if($this->hashPassword($inputPassword) === $account->password) {
               return true;
            }
         }
      }
      return $this->error("Invalid creditentials");
   }
   private function getAuth()
   {
      if(!$this->validIp()) return $this->error("Invalid host");
      if(!isset($_POST["email"]) || $_POST["email"] === "" || !filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
         return $this->error("Invalid email");
      } else {
         $inputEmail = $_POST["email"];
      }
      if(!isset($_POST["password"]) || $_POST["password"] === "") {
         return $this->error("Invalid password");
      } else {
         $inputPassword = $_POST["password"];
      }
      foreach($this->configuration->auth as $account) {
         if($inputEmail === $account->email) {
            if($this->hashPassword($inputPassword) === $account->password) {
               return array(
                  "name"=>$account->name,
                  "email"=>$account->email
               );
            }
         }
      }
      return $this->error("Invalid creditentials");
   }
   private function hashPassword($password)
   {
      return md5($this->configuration->salt . $password . $this->configuration->salt);
   }
   private function validIp(){
      if($this->configuration->ip === "") return true;
      else if($this->configuration->ip !== $_SERVER["REMOTE_ADDR"]) return false;
      else return true;
   }
   private function success($message)
   {
      return $this->print_json("success", $message);
   }
   private function error($message)
   {
      return $this->print_json("error", $message);
   }
   private function print_json($state, $message)
   {
      echo json_encode(array(
         "state"=>$state,
         "message"=>$message
      ), $this->prettyJson);
      exit();
   }
}

$perso = new VueCleanServer();
