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
      $this->response = new Message();
      $this->ressource = new Ressource();
      $this->configuration = $this->ressource->getJSON('config');
      $this->auth = new Auth($this->configuration);

      // PROCEED ACTION
      if (!isset($_POST) || !isset($_POST["action"]) || $_POST["action"] === "") $this->response->error("Action not specified");
         try{
            switch ($_POST["action"]) {
               case "auth":
                  $this->response->success($this->auth->user($_POST));
               break;

               case "getmodel":
                  if ($this->auth->admin($_POST))
                     $this->response->success($this->ressource->getJSON('model'));
               break;
               case "getcontent":
                     $this->response->success($this->ressource->getJSON('content'));
               break;

               case "getusers":
                  if ($this->auth->admin($_POST)){
                     foreach ($this->configuration->auth as $key => $value) {
                        $value->avatar = md5(strtolower(trim($value->email)));
                     }
                     $this->response->success($this->configuration->auth);
                  }
               break;
               case "setusers":
                     $this->response->success($this->ressource->getJSON('content'));
               break;

               case "setmodel":
                  if ($this->auth->admin($_POST))
                     if(!isset($_POST["body"]) || $_POST["body"] === "") throw new Exception("JSON not found");
                        if($this->ressource->saveJSON("model", $_POST["body"])) $this->response->success("Model saved");
               break;
               case "setcontent":
                  if ($this->auth->user($_POST))
                     if(!isset($_POST["body"]) || $_POST["body"] === "") throw new Exception("JSON not found");
                        if($this->ressource->saveJSON("content", $_POST["body"])) $this->response->success("Content saved");
               break;

               default:
                  throw new Exception("Action not valid");
               break;
            }
         } catch (Exception $error) {
            $this->response->error($error->getMessage());
         }
   }
}
new VueCleanServer();
