// https://stackoverflow.com/questions/59160472/how-to-solve-x-cache-error-from-cloudfront-on-spa

function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var host = headers.host && headers.host.value ? headers.host.value : 'research-hub.auckland.ac.nz'; // replace with hardcoded host 
    
    
    if (request.uri === '/service/media-productions') { //SCTASK0366067
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: { 'location': { 'value' : 'https://www.auckland.ac.nz/en/intranet/services/buying-payment/approved-suppliers/photographers-videographers-designers.html' } }
        };   
    } 
    
    if (request.uri === '/platforms' || request.uri === '/article/share') { //SCTASK0366060, RSM-4221
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: { 'location': { 'value' : `https://${host}/subhub/research-platforms` } }
        }
    }
    
    
    if (!hasExtension(request.uri)) {
        request.uri = '/index.html';
    }

    return request;
}

function hasExtension( url ) {
    var lastElement = url.split('/').pop();
    var hasExtension = lastElement.split(/[#?]/)[0].includes('.');
    return hasExtension;
}
