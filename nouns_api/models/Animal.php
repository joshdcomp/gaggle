<?php
class Animal
{
    public $name;

    public function get_names()
    {
        $name = $this->name;
        $names = file_get_contents('data/collective-nouns.json');

        if( $name && isset( $names[$name]) ){
            return $names[$name];
        }
        else{
            return $names;
        }
    }
}
