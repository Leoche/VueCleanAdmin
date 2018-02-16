<?php
class Auth
{
   private $configuration;
   private $prettyJson = true;

   public function __construct($configuration)
   {
      $this->configuration = $configuration;
   }

   public function user()
   {
      $user = Validator::user();

      if (!$this->validIp())
         throw new Exception('Invalid host');

      foreach ($this->configuration->auth as $account) {
         if ($user->email === $account->email) {
            if ($this->hashPassword($user->password) === $account->password || $user->password === $account->password) {
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
   public function admin()
   {
      $user = $this->user();
      if ($user["role"] === "admin") return true;
      else return false;
   }
   public function getUserByEmail($email)
   {
      foreach ($this->configuration->auth as $account) {
         if ($email === $account->email)
          return $account;
      }
      throw new Exception("Can't find user for " . $email);
   }
   public function getUserIndexByEmail($email)
   {
      foreach ($this->configuration->auth as $key => $account) {
         if ($email === $account->email)
          return $key;
      }
      throw new Exception("Can't find user index for " . $email);
   }
   public function addUser($name, $email, $password)
   {
      $user = $this->user($email, $password);
      $newUser = array(
         "name"=>$name,
         "password"=>$password,
         "email"=>$email,
         "role"=>"user",
         "avatar"=>md5(strtolower(trim($email)))
      );
   }
   public function hashPassword($password)
   {
      return md5($this->configuration->salt . $password . $this->configuration->salt);
   }
   private function validIp(){
      if ($this->configuration->ip === "") return true;
      else if ($this->configuration->ip !== $_SERVER["REMOTE_ADDR"]) return false;
      else return true;
   }
}
