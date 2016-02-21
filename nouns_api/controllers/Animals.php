<?php
class Animals
{
    private $_params;

    public function __contstruct( $params )
    {
        $this->_params = $params;
    }

    public function createAction()
    {
        //for when we want to create new animals
        return 'we haven\'t gotten this far yet';
    }

    public function readAction()
    {
        //read all animals available
        $animal = new Animal();
        // eventually the api will get the nouns for specific animals,
        // but right now we're just returning the whole thing
        $animal->name = empty( $this->_params['specifically'] )
            ? $this->_params['specifically']
            : false;

        return $animal->get_names();
    }

    public function updateAction()
    {
        //update an animal
        return 'we haven\'t gotten this far yet';
    }

    public function deleteAction()
    {
        //delete an animal
        return 'we haven\'t gotten this far yet';
    }
}
