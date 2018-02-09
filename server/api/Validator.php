<?php
class Validator{
   public static function user(){
      $sanData = new stdClass();

      if (!isset($_POST["email"]) || !isset($_POST["password"]))
         throw new Exception('Email or password not found');

      if ($_POST["password"] === "")
         throw new Exception('Empty password');
      if ($_POST["email"] === "")
         throw new Exception('Empty email');

      if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL))
         throw new Exception('Invalid email');

      $sanData->email = $_POST["email"];
      $sanData->password = $_POST["password"];

      return $sanData;
   }
   public static function content(){
      if(!isset($_POST["body"]) || $_POST["body"] === "") throw new Exception("JSON not found");
   }
   public static function useremail(){
      if (!isset($_POST["useremail"]))
         throw new Exception('Email not found');
      if ($_POST["useremail"] === "")
         throw new Exception('Empty email');
      if (!filter_var($_POST["useremail"], FILTER_VALIDATE_EMAIL))
         throw new Exception('Invalid email');
      return $_POST["useremail"];
   }
}