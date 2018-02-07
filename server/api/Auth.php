<?php
class Auth
{
   private $configuration;
   private $prettyJson = true;

   public function __construct($configuration)
   {
      $this->configuration = $configuration;
   }

   public function user($email, $password=null)
   {
      if ($password === null) {
         if (!isset($_POST["email"]) || !isset($_POST["password"])) {
            throw new Exception('Email or password not found');
         } else {
            $email = $_POST["email"];
            $password = $_POST["password"];
         }
      }

      if (!$this->validIp())
         throw new Exception('Invalid host');

      if (!filter_var($email, FILTER_VALIDATE_EMAIL))
         throw new Exception('Invalid email');

      if ($password === "")
         throw new Exception('Invalid password');

      foreach ($this->configuration->auth as $account) {
         if ($email === $account->email) {
            if ($this->hashPassword($password) === $account->password || $password === $account->password) {
               return array(
                  "name"=>$account->name,
                  "password"=>$account->password,
                  "email"=>$account->email,
                  "role"=>$account->role,
                  "avatar"=>md5(strtolower(trim($account->email)))
               );
            }
         }
      }
      throw new Exception('Invalid creditentials');
   }
   public function admin($email, $password=null)
   {
      $user = $this->user($email, $password);
      if ($user["role"] === "admin") return true;
      throw new Exception('Invalid permissions');
   }
   private function hashPassword($password)
   {
      return md5($this->configuration->salt . $password . $this->configuration->salt);
   }
   private function validIp(){
      if ($this->configuration->ip === "") return true;
      else if ($this->configuration->ip !== $_SERVER["REMOTE_ADDR"]) return false;
      else return true;
   }
}
