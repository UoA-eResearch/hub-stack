// https://stackoverflow.com/questions/59160472/how-to-solve-x-cache-error-from-cloudfront-on-spa

function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var host = headers.host && headers.host.value ? headers.host.value : 'research-hub.auckland.ac.nz'; // replace with hardcoded host 
    
    var redirectMap = {
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs": "/subhub/discovery-profiles-research-outputs",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace": "/subhub/add-research-discovery-profile-and-researchspace",
        "/open-access/open-access-publishing-agreements": "/article/open-access-publishing-agreements",
        "/metrics/introduction-to-metrics": "/article/introduction-to-metrics",
        "/researcher-profiles-and-ids/scopus-ID": "/article/scopus-id",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/deposit-research-outputs": "/article/deposit-research-outputs",
        "/metrics/responsible-metrics": "/article/responsible-metrics",
        "/open-access/why-should-i-make-my-work-open-access": "/article/why-should-i-make-my-work-open-access",
        "/the-publishing-process/how-do-i-publish-in-a-journal": "/article/how-do-i-publish-in-a-journal",
        "/researcher-profiles-and-ids/orcid": "/article/orcid",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/research-outputs-manual-records": "/article/research-outputs-manual-records",
        "/open-access/open-access-toolkit-for-aotearoa-new-zealand-researchers": "/article/open-access-toolkit-for-aotearoa-new-zealand-researchers",
        "/publishing-communication-profiles/publishing-guide/open-access/creative-commons": "/article/creative-commons",
        "/the-publishing-process/what-journal-should-i-publish-in": "/article/what-journal-should-i-publish-in",
        "/open-access/creative-commons": "/article/what-is-open-access",
        "/open-access/diamond-open-access": "/article/diamond-open-access",
        "/open-access/green-open-access": "/article/green-open-access",
        "/open-access/glossary-of-open-access-terms": "/article/glossary-of-open-access-terms",
        "/open-access/ethical-concerns-about-open-access-fees-and-apcs": "/article/ethical-concerns-about-open-access-fees-and-apcs",
        "/the-publishing-process/predatory-publishers": "/article/predatory-publishers",
        "/metrics/metrics-for-promotions-grants-and-awards": "/article/metrics-for-promotions-grants-and-awards",
        "/the-publishing-process/top-ranked-journals-list": "/article/top-ranked-journals-list",
        "/researcher-profiles-and-ids/how-to-build-and-maintain-your-researcher-profile": "/article/how-to-build-and-maintain-your-researcher-profile",
        "/open-access/how-do-i-make-my-journal-article-open-access": "/article/how-do-i-make-my-journal-article-open-access",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/update-engagement-tab": "/article/update-engagement-tab",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/update-teaching-and-supervision-tab": "/article/update-teaching-and-supervision-tab",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-privacy-settings": "/article/discovery-privacy-settings",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/edit-your-research-tab": "/article/edit-your-research-tab",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/research-outputs-searches": "/article/research-outputs-searches",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-update-personal-details": "/article/discovery-update-personal-details",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-profile-uses": "/article/discovery-profile-uses",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/introduction-discovery-profile": "/article/introduction-discovery-profile",
        "/researcher-profiles-and-ids/discovery-profiles-research-outputs/workshop-discovery-profile": "/event/workshop-discovery-profile",
        "/researcher-profiles-and-ids/workshop-orcid": "/event/workshop-orcid",
        "/open-access/open-access-week-events": "/event/open-access-week-events",
        "/researcher-profiles-and-ids/raising-your-research-profile": "/event/raising-your-research-profile",
        "/the-publishing-process/publishing-overview-workshop": "/event/publishing-overview-workshop",
        "/open-access/workshop-pathways-to-open-access-uoa": "/event/workshop-pathways-to-open-access-uoa",
        "/the-publishing-process/copyright-advisory": "/service/copyright-advisory",
        "/open-access/open-access-support-fund-for-high-impact-publications": "/funding/open-access-support-fund-for-high-impact-publications"
    } 

    if (request.uri === '/service/media-productions') { //SCTASK0366067
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: { 'location': { 'value' : 'https://www.auckland.ac.nz/en/intranet/services/buying-payment/approved-suppliers/photographers-videographers-designers.html' } }
        };   
    } 
    
    if (redirectMap[request.uri]) { 
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: { 'location': { 'value' : `https://${host}${redirectMap[request.uri]}` } }
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
