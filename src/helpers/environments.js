let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3001'
        break;
    case 'bludebadge-client.herokuapp.com':
        APIURL = 'https://bludebadge-client.herokuapp.com/'
}
export default APIURL;