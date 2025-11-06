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

    // SCTASK0368008 start
    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/subhub/discovery-profiles-research-outputs` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/subhub/add-research-discovery-profile-and-researchspace` }
            }
        };
    }

    if (request.uri === '/open-access/open-access-publishing-agreements') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/open-access-publishing-agreements` }
            }
        };
    }

    if (request.uri === '/metrics/introduction-to-metrics') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/introduction-to-metrics` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/scopus-ID') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/scopus-id` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/deposit-research-outputs') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/deposit-research-outputs` }
            }
        };
    }

    if (request.uri === '/metrics/responsible-metrics') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/responsible-metrics` }
            }
        };
    }

    if (request.uri === '/open-access/why-should-i-make-my-work-open-access') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/why-should-i-make-my-work-open-access` }
            }
        };
    }

    if (request.uri === '/the-publishing-process/how-do-i-publish-in-a-journal') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/how-do-i-publish-in-a-journal` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/orcid') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/orcid` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/research-outputs-manual-records') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/research-outputs-manual-records` }
            }
        };
    }

    if (request.uri === '/open-access/open-access-toolkit-for-aotearoa-new-zealand-researchers') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/open-access-toolkit-for-aotearoa-new-zealand-researchers` }
            }
        };
    }

    if (request.uri === '/publishing-communication-profiles/publishing-guide/open-access/creative-commons') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/creative-commons` }
            }
        };
    }

    if (request.uri === '/the-publishing-process/what-journal-should-i-publish-in') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/what-journal-should-i-publish-in` }
            }
        };
    }

    if (request.uri === '/open-access/creative-commons') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/what-is-open-access` }
            }
        };
    }

    if (request.uri === '/open-access/diamond-open-access') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/diamond-open-access` }
            }
        };
    }

    if (request.uri === '/open-access/green-open-access') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/green-open-access` }
            }
        };
    }

    if (request.uri === '/open-access/glossary-of-open-access-terms') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/glossary-of-open-access-terms` }
            }
        };
    }

    if (request.uri === '/open-access/ethical-concerns-about-open-access-fees-and-apcs') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/ethical-concerns-about-open-access-fees-and-apcs` }
            }
        };
    }

    if (request.uri === '/the-publishing-process/predatory-publishers') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/predatory-publishers` }
            }
        };
    }

    if (request.uri === '/metrics/metrics-for-promotions-grants-and-awards') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/metrics-for-promotions-grants-and-awards` }
            }
        };
    }

    if (request.uri === '/the-publishing-process/top-ranked-journals-list') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/top-ranked-journals-list` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/how-to-build-and-maintain-your-researcher-profile') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/how-to-build-and-maintain-your-researcher-profile` }
            }
        };
    }

    if (request.uri === '/open-access/how-do-i-make-my-journal-article-open-access') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/how-do-i-make-my-journal-article-open-access` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/update-engagement-tab') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/update-engagement-tab` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/update-teaching-and-supervision-tab') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/update-teaching-and-supervision-tab` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-privacy-settings') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/discovery-privacy-settings` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/edit-your-research-tab') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/edit-your-research-tab` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/research-outputs-searches') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/research-outputs-searches` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-update-personal-details') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/discovery-update-personal-details` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-profile-uses') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/discovery-profile-uses` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/introduction-discovery-profile') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/article/introduction-discovery-profile` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/discovery-profiles-research-outputs/workshop-discovery-profile') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/event/workshop-discovery-profile` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/workshop-orcid') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/event/workshop-orcid` }
            }
        };
    }

    if (request.uri === '/open-access/open-access-week-events') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/event/open-access-week-events` }
            }
        };
    }

    if (request.uri === '/researcher-profiles-and-ids/raising-your-research-profile') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/event/raising-your-research-profile` }
            }
        };
    }

    if (request.uri === '/the-publishing-process/publishing-overview-workshop') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/event/publishing-overview-workshop` }
            }
        };
    }

    if (request.uri === '/open-access/workshop-pathways-to-open-access-uoa') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/event/workshop-pathways-to-open-access-uoa` }
            }
        };
    }

    if (request.uri === '/the-publishing-process/copyright-advisory') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/service/copyright-advisory` }
            }
        };
    }

    if (request.uri === '/open-access/open-access-support-fund-for-high-impact-publications') {
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                location: { value: `https://${host}/funding/open-access-support-fund-for-high-impact-publications` }
            }
        };
    }

    // SCTASK0368008 end

    
    
    
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
