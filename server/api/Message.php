<?php
class Message{
   public function success($body)
   {
      return $this->print_json("success", $body, $_POST["action"] . " réussi");
   }
   public function error($message)
   {
      return $this->print_json("error", null, $message);
   }
   public function print_json($state, $body, $message)
   {
      echo json_encode(array(
         "state"=>$state,
         "message"=>$message,
         "body"=>$body
      ));
      exit();
   }
}