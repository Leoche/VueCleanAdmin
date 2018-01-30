<?php
class VueCleanServer
{
   private $configuration;
   private $prettyJson = true;

   public function __construct()
   {
      // GET CONFIG
      $this->configuration = @file_get_contents("../config.json");
      if ($this->configuration === FALSE) $this->error("Can't access to the config.json");
      else $this->configuration = json_decode($this->configuration);

      // PROCEED ACTION
      if (!isset($_POST) || !isset($_POST["action"]) || $_POST["action"] === "") $this->error("Action not specified");
      switch ($_POST["action"]) {
         case "auth":
            if($this->validAuth())
               $this->success("Succefully logged");
         break;
      }
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
            if($inputPassword === $account->password) {
               return true;
            }
         }
      }
      return $this->error("Invalid creditentials");
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
