<?php
class Message{
   public function success($message)
   {
      return $this->print_json("success", $message);
   }
   public function error($message)
   {
      return $this->print_json("error", $message);
   }
   private function print_json($state, $message)
   {
      echo json_encode(array(
         "state"=>$state,
         "message"=>$message
      ));
      exit();
   }
}