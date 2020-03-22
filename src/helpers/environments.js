let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3001'
        break;
    case 'cmk-bluebadge-client.herokuapp.com':
        APIURL = 'https://cmk-bluebadge-server.herokuapp.com'
}
export default APIURL;