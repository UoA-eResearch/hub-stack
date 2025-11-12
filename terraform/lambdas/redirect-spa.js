// https://stackoverflow.com/questions/59160472/how-to-solve-x-cache-error-from-cloudfront-on-spa
import cf from 'cloudfront';

async function handler(event) {
    const kvs = cf.kvs();
    var request = event.request;
    
    if (request.uri === '/service/media-productions') { //SCTASK0366067
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: { 'location': { 'value' : 'https://www.auckland.ac.nz/en/intranet/services/buying-payment/approved-suppliers/photographers-videographers-designers.html' } }
        }
    }
    
    try {
        const lookupKey = request.uri.replace(/^\/+/, '');
        const target = await kvs.get(lookupKey, { format: 'string' });
        if (target && typeof target === 'string') {
            const location = target.startsWith('/') ? target : `/${target}`;
            return {
                statusCode: 301,
                statusDescription: 'Moved Permanently',
                headers: {
                    location: { value: location }
                }
            }
        }
    } catch (e) {}

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