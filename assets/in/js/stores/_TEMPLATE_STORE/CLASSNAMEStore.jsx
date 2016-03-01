var CLASSNAMESStore = new EventEmitter();

var _CLASSNAMES = [];

CLASSNAMESStore.isLoading = false;
CLASSNAMESStore.status = 'ready';

////////////////////////////////////
// Emitters ////////////////////////
////////////////////////////////////

CLASSNAMESStore.addChangeListener = function(callback) {
  CLASSNAMESStore.on(CLASSNAMEConstants.CHANGE, callback);
};

CLASSNAMESStore.removeChangeListener = function(callback) {
  CLASSNAMESStore.removeListener(CLASSNAMEConstants.CHANGE, callback);
};

CLASSNAMESStore.emitChange = function() {
  CLASSNAMESStore.emit(CLASSNAMEConstants.CHANGE);
};

////////////////////////////////////
// Getters /////////////////////////
////////////////////////////////////

// `id` is optional. If the id is anything other than a number, send
// the whole thing. If id is passed and there's a match in the array,
// send that. Else, return null
CLASSNAMESStore.get = function(id) {
  var result = null;

  if ( isNaN(id) ) {
    console.log(_CLASSNAMES);
    result = _CLASSNAMES;
  }
  else {
    console.log(id);
    for (var i = 0; i < _CLASSNAMES.length; i++) {
      if (_CLASSNAMES[i].id === id) {
        result = _CLASSNAMES[i];
      }
    }
  }
  return result;
};

////////////////////////////////////
// Dispatch Flags //////////////////
////////////////////////////////////

CLASSNAMESStore.dispatchToken = Dispatcher.register(function (action) {
  switch(action.type) {
    case CLASSNAMEConstants.FETCH:
      CLASSNAMESStore.isLoading = true;
      CLASSNAMESStore.status = 'working';
      CLASSNAMESStore.emit(CLASSNAMEConstants.CHANGE);
      break;

    case CLASSNAMEConstants.RECEIVE:
      CLASSNAMESStore.isLoading = false;
      CLASSNAMESStore.status = 'success';
      _CLASSNAMES = action.data;
      CLASSNAMESStore.emit(CLASSNAMEConstants.CHANGE);
      break;

    case CLASSNAMEConstants.RECEIVE_FAIL:
      CLASSNAMESStore.isLoading = false;
      CLASSNAMESStore.status = 'fail';
      CLASSNAMESStore.emit(CLASSNAMEConstants.CHANGE);
      break;


    case CLASSNAMEConstants.CREATE:
      CLASSNAMESStore.isLoading = true;
      CLASSNAMESStore.status = 'working';
      CLASSNAMESStore.emit(CLASSNAMEConstants.CHANGE);
      break;

    case CLASSNAMEConstants.RECEIVE_CREATE:
      CLASSNAMESStore.isLoading = false;
      CLASSNAMESStore.status = 'success';

      _CLASSNAMES.push(action.data);

      CLASSNAMESStore.emit(CLASSNAMEConstants.CHANGE);
      break;

    case CLASSNAMEConstants.REVCEIVE_CREATE_FAIL:
      CLASSNAMESStore.isLoading = false;
      CLASSNAMESStore.status = 'fail';
      CLASSNAMESStore.emit(CLASSNAMEConstants.CHANGE);
      break;

      default:
        // do nothing
    }
});
