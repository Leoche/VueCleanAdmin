<?php
header('Access-Control-Allow-Origin: *');

require("Message.php");
require("Ressource.php");
require("Auth.php");

class VueCleanServer
{
   private $configuration;

   public function __construct()
   {
      // GET CONFIG
      $this->ressource = new Ressource();
      $this->configuration = $this->ressource->getJSON('config');
      $this->auth = new Auth($this->configuration);

      print_r($this->configuration);
      return;
      // PROCEED ACTION
      if (!isset($_POST) || !isset($_POST["action"]) || $_POST["action"] === "") $this->error("Action not specified");
      switch ($_POST["action"]) {
         case "auth":
            if($this->getAuth())
               echo json_encode(array(
                  "state" => "success",
                  "body" => json_encode($this->getAuth())
               ));
            die();
         break;
         case "getmodel":
            if($this->validAuth())
               echo json_encode(array(
                  "state" => "success",
                  "body" => json_decode($this->retrieve_JSON('model'))
               ));
            die();
         break;
         case "getcontent":
               echo json_encode(array(
                  "state" => "success",
                  "body" => json_decode($this->retrieve_JSON('content'))
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
}
new VueCleanServer();
