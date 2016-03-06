var CLASSNAMESActions = {
  //pass an id or -1 to get all
  fetch: (id) => {
    // Build the route so we can either get one CLASSNAME or all
    var route = (isNaN(id))
      ? '/CLASSNAMES'
      : '/CLASSNAMES/' + id;

    Dispatcher.dispatch({
      type: CLASSNAMESConstants.FETCH
    });

    Ajax.get(Ajax.api(route)).then(
      // Success
      (data) => {
        console.log(data);
        Dispatcher.dispatch({
          type: CLASSNAMESConstants.RECEIVE,
          data: data
        });
      },
      // Fail
      (err) => {
        Error('CLASSNAMESActions::login', err);

        Dispatcher.dispatch({
          type: CLASSNAMESConstants.RECEIVE_FAIL
        });
    });
  },
  create: (newCLASSNAME) => {
    Dispatcher.dispatch({
      type: CLASSNAMESConstants.CREATE
    });

    // Format for use in rails...gota wrap the new object data in a namespace
    var data = {
      'CLASSNAME': {
        // ...
      }
    };

    Ajax.post(
      Ajax.api('/CLASSNAMES/new'),
      data
    ).then(
      // Success
      (data) => {
        Dispatcher.dispatch({
          type: CLASSNAMESConstants.REVCEIVE_CREATE,
          data: data
        });
      },
      // Fail
      (err) => {
        new Error('CLASSNAMESActions::create', err);

        Dispatcher.dispatch({
          type: CLASSNAMESConstants.REVCEIVE_CREATE_FAIL
        });
      }
    );
  }
}
