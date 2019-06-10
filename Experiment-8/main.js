var apiKey;
var sessionId;
var token;
function handleError(error) {
  if (error) {
    console.error(error);
  }
}
function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);
  session.on('streamCreated', function streamCreated(event) {
    var subscriberOptions = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
    session.subscribe(event.stream, 'subscriber', subscriberOptions, handleError);
  });
  session.on('sessionDisconnected', function sessionDisconnected(event) {
    console.log('You were disconnected from the session.', event.reason);
  });
  var publisherOptions = {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  };
  var publisher = OT.initPublisher('publisher', publisherOptions, handleError);
  session.connect(token, function callback(error) {
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
if (API_KEY && TOKEN && SESSION_ID) {
  apiKey = API_KEY;
  sessionId = SESSION_ID;
  token = TOKEN;
  initializeSession();
} else if (SAMPLE_SERVER_BASE_URL) {
  fetch(SAMPLE_SERVER_BASE_URL + '/session').then(function fetch(res) {
    return res.json();
  }).then(function fetchJson(json) {
    apiKey = json.apiKey;
    sessionId = json.sessionId;
    token = json.token;
    initializeSession();
  }).catch(function catchErr(error) {
    handleError(error);
    alert('Failed to get opentok sessionId and token.');
  });
}
