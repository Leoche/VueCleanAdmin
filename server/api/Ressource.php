<?php
class Ressource{
   public function getJSON($filename) {
      $json = @file_get_contents("../".$filename.".json");
      if ($json === FALSE) $this->error("Can't access to the ".$filename.".json");
      else return json_decode($json);
   }
   public function saveJSON($filename, $body) {
      $json = json_decode($body);
      if (json_last_error() !== JSON_ERROR_NONE)  $this->error("Can't save a non JSON file");
      if (@file_put_contents("../".$filename.".json", $body) === FALSE) $this->error("Can't save to ".$filename.".json");
      else return true;
   }
   public function upload($filename, $tmp_file) {
      // TODO
   }
}

