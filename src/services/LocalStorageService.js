const LocalStorageService = (function () {
  var _service
  function _getService () {
    if (!_service) {
      _service = this
      return _service
    }
    return _service
  }
  function _getAccessToken () {
    return localStorage.getItem('idToken')
  }
  return {
    getService: _getService,
    getAccessToken: _getAccessToken
  }
})()

export default LocalStorageService
