<?php
class Message{
   public function success($body)
   {
      return $this->print_json("success", $body, null);
   }
   public function error($message)
   {
      return $this->print_json("error", null, $message);
   }
   private function print_json($state, $body, $message)
   {
      echo json_encode(array(
         "state"=>$state,
         "message"=>$message,
         "body"=>$body
      ));
      exit();
   }
}