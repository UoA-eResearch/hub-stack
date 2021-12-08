// https://stackoverflow.com/questions/59160472/how-to-solve-x-cache-error-from-cloudfront-on-spa

function handler(event) {
    var request = event.request;
    
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
