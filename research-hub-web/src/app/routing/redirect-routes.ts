import { Routes } from "@angular/router";

export const redirectRoutes: Routes = [
    { //RSM-4221
        path: 'platforms',
        redirectTo: 'subhub/research-platforms',
        pathMatch: 'full'
    },
    { //SCTASK0366060
        path: 'article/share',
        redirectTo: 'subhub/research-platforms',
        pathMatch: 'full'
    },
    // SCTASK0368008 start
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs',
        redirectTo: 'subhub/discovery-profiles-research-outputs',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace',
        redirectTo: 'subhub/add-research-discovery-profile-and-researchspace',
        pathMatch: 'full'
    },
    {
        path: 'open-access/open-access-publishing-agreements',
        redirectTo: 'article/open-access-publishing-agreements',
        pathMatch: 'full'
    },
    {
        path: 'metrics/introduction-to-metrics',
        redirectTo: 'article/introduction-to-metrics',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/scopus-ID',
        redirectTo: 'article/scopus-ID',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/deposit-research-outputs',
        redirectTo: 'article/deposit-research-outputs',
        pathMatch: 'full'
    },
    {
        path: 'metrics/responsible-metrics',
        redirectTo: 'article/responsible-metrics',
        pathMatch: 'full'
    },
    {
        path: 'open-access/why-should-i-make-my-work-open-access',
        redirectTo: 'article/why-should-i-make-my-work-open-access',
        pathMatch: 'full'
    },
    {
        path: 'the-publishing-process/how-do-i-publish-in-a-journal',
        redirectTo: '/article/how-do-i-publish-in-a-journal',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/orcid',
        redirectTo: 'article/orcid',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/research-outputs-manual-records',
        redirectTo: 'article/research-outputs-manual-records',
        pathMatch: 'full'
    },
    {
        path: 'open-access/open-access-toolkit-for-aotearoa-new-zealand-researchers',
        redirectTo: 'article/open-access-toolkit-for-aotearoa-new-zealand-researchers',
        pathMatch: 'full'
    },
    {
        path: 'publishing-communication-profiles/publishing-guide/open-access/creative-commons',
        redirectTo: 'article/creative-commons',
        pathMatch: 'full'
    },
    {
        path: 'the-publishing-process/what-journal-should-i-publish-in',
        redirectTo: 'article/what-journal-should-i-publish-in',
        pathMatch: 'full'
    },
    {
        path: 'open-access/creative-commons',
        redirectTo: 'article/what-is-open-access',
        pathMatch: 'full'
    },
    {
        path: 'open-access/diamond-open-access',
        redirectTo: 'article/diamond-open-access',
        pathMatch: 'full'
    },
    {
        path: 'open-access/green-open-access',
        redirectTo: 'article/green-open-access',
        pathMatch: 'full'
    },
    {
        path: 'open-access/glossary-of-open-access-terms',
        redirectTo: 'article/glossary-of-open-access-terms',
        pathMatch: 'full'
    },
    {
        path: 'open-access/ethical-concerns-about-open-access-fees-and-apcs',
        redirectTo: 'article/ethical-concerns-about-open-access-fees-and-apcs',
        pathMatch: 'full'
    },
    {
        path: 'the-publishing-process/predatory-publishers',
        redirectTo: 'article/predatory-publishers',
        pathMatch: 'full'
    },
    {
        path: 'metrics/metrics-for-promotions-grants-and-awards',
        redirectTo: 'article/metrics-for-promotions-grants-and-awards',
        pathMatch: 'full'
    },
    {
        path: 'the-publishing-process/top-ranked-journals-list',
        redirectTo: 'article/top-ranked-journals-list',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/how-to-build-and-maintain-your-researcher-profile',
        redirectTo: 'article/how-to-build-and-maintain-your-researcher-profile',
        pathMatch: 'full'
    },
    {
        path: 'open-access/how-do-i-make-my-journal-article-open-access',
        redirectTo: 'article/how-do-i-make-my-journal-article-open-access',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/update-engagement-tab',
        redirectTo: 'article/update-engagement-tab',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/update-teaching-and-supervision-tab',
        redirectTo: 'article/update-teaching-and-supervision-tab',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-privacy-settings',
        redirectTo: 'article/discovery-privacy-settings',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/edit-your-research-tab',
        redirectTo: 'article/edit-your-research-tab',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/research-outputs-searches',
        redirectTo: 'article/research-outputs-searches',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-update-personal-details',
        redirectTo: 'article/discovery-update-personal-details',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-profile-uses',
        redirectTo: 'article/discovery-profile-uses',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/introduction-discovery-profile',
        redirectTo: 'article/introduction-discovery-profile',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/discovery-profiles-research-outputs/workshop-discovery-profile',
        redirectTo: 'event/workshop-discovery-profile',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/workshop-orcid',
        redirectTo: 'event/workshop-orcid',
        pathMatch: 'full'
    },
    {
        path: 'open-access/open-access-week-events',
        redirectTo: 'event/open-access-week-events',
        pathMatch: 'full'
    },
    {
        path: 'researcher-profiles-and-ids/raising-your-research-profile',
        redirectTo: 'event/raising-your-research-profile',
        pathMatch: 'full'
    },
    {
        path: 'the-publishing-process/publishing-overview-workshop',
        redirectTo: 'event/publishing-overview-workshop',
        pathMatch: 'full'
    },
    {
        path: 'open-access/workshop-pathways-to-open-access-uoa',
        redirectTo: 'event/workshop-pathways-to-open-access-uoa',
        pathMatch: 'full'
    },
    {
        path: 'the-publishing-process/copyright-advisory',
        redirectTo: 'service/copyright-advisory',
        pathMatch: 'full'
    },
    {
        path: 'open-access/open-access-support-fund-for-high-impact-publications',
        redirectTo: 'funding/open-access-support-fund-for-high-impact-publications',
        pathMatch: 'full'
    },
    // SCTASK0368008 end
    // SCTASK0368795 start
    {
    path: 'subhub/research-project-management',
    redirectTo: 'subhub/research-grant-management',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/negotiate-and-establish-contracts/fast-track-project-activation',
    redirectTo: 'process/manage-research-fast-track-project-activation',
    pathMatch: 'full'
  },
  {
    path: 'article/fast-track-project-activation',
    redirectTo: 'process/manage-research-fast-track-project-activation',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/negotiate-and-establish-contracts/project-activation',
    redirectTo: 'article/project-activation',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/negotiate-and-establish-contracts/subcontracts',
    redirectTo: 'process/negotiate-and-execute-research-subcontract',
    pathMatch: 'full'
  },
  {
    path: 'article/subcontracts',
    redirectTo: 'process/negotiate-and-execute-research-subcontract',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/negotiate-and-establish-contracts/memorandum-of-understanding',
    redirectTo: 'article/memorandum-of-understanding',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals/prepare-or-revise-project-budget',
    redirectTo: 'process/prepare-budget-for-funding-proposal',
    pathMatch: 'full'
  },
  {
    path: 'article/prepare-or-revise-project-budget',
    redirectTo: 'process/prepare-budget-for-funding-proposal',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals/writing-a-research-proposal',
    redirectTo: 'article/writing-a-research-proposal',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals/fx-rates',
    redirectTo: 'article/fx-rates',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/manage-deliverables-and-milestones',
    redirectTo: 'article/manage-deliverables-and-milestones',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/manage-risks-and-issues',
    redirectTo: 'article/manage-risks-and-issues',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/negotiate-and-establish-contracts/material-transfer-agreements',
    redirectTo: 'article/material-transfer-agreements',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/negotiate-and-establish-contracts/varying-a-contract',
    redirectTo: 'article/varying-a-contract',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals/submit-a-proposal-with-institutional-approval',
    redirectTo: 'article/submit-a-proposal-with-institutional-approval',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/research-and-consulting-incentives/c3-c4-incentive-payments-for-consulting-projects',
    redirectTo: 'article/c3-c4-incentive-payments-for-consulting-projects',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects',
    redirectTo: 'subhub/conduct-and-close-research-projects',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/negotiate-and-establish-contracts/confidentiality-and-non-disclosure-agreements',
    redirectTo: 'article/confidentiality-and-non-disclosure-agreements',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/negotiate-and-establish-contracts/contracts-and-clauses',
    redirectTo: 'article/contracts-and-clauses',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals',
    redirectTo: 'subhub/develop-and-submit-proposals',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals/funds-categorisation',
    redirectTo: 'subhub/funds-categorisation',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals/funds-categorisation/partnered-schemes',
    redirectTo: 'article/partnered-schemes',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals/funds-categorisation/self-service-schemes',
    redirectTo: 'article/self-service-schemes',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals/funds-categorisation/serviced-schemes',
    redirectTo: 'article/serviced-schemes',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/develop-and-submit-proposals/funds-categorisation/supported-schemes',
    redirectTo: 'article/supported-schemes',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/manage-budget-and-resources',
    redirectTo: 'article/manage-budget-and-resources',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/negotiate-and-establish-contracts',
    redirectTo: 'subhub/negotiate-and-establish-contracts',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/research-and-consulting-incentives/outside-activities-hours',
    redirectTo: 'article/outside-activities-hours',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/reporting-guidance-and-templates',
    redirectTo: 'article/reporting-guidance-and-templates',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/research-and-consulting-incentives',
    redirectTo: 'subhub/research-and-consulting-incentives',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/research-and-consulting-incentives/research-development-accounts-rda',
    redirectTo: 'article/research-development-accounts-rda',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/research-and-consulting-incentives/research-project-funding-case-study',
    redirectTo: 'casestudy/research-project-funding-case-study',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/research-project-scholarships-rps',
    redirectTo: 'article/research-project-scholarships-rps',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/internal-extensions',
    redirectTo: 'article/internal-extensions',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/conduct-and-close-research-projects/project-closure',
    redirectTo: 'article/project-closure',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities',
    redirectTo: 'subhub/identify-explore-and-create-opportunities',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/a-guide-to-finding-research-funding-opportunities-and-the-uoa-submission',
    redirectTo: 'article/a-guide-to-finding-research-funding-opportunities-and-the-uoa-submission',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding',
    redirectTo: 'subhub/domestic-funding',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/mbie-endeavour-fund',
    redirectTo: 'subhub/mbie-endeavour-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/mbie-endeavour-fund/endeavour-smart-ideas',
    redirectTo: 'funding/endeavour-smart-ideas',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/mbie-endeavour-fund/endeavour-research-programmes',
    redirectTo: 'funding/endeavour-research-programmes',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/mbie-endeavour-fund/endeavour-fund-application-support',
    redirectTo: 'article/endeavour-fund-application-support',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/mbie-endeavour-fund/introducing-pitau-mbies-new-online-portal',
    redirectTo: 'article/introducing-pitau-mbies-new-online-portal',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/royal-society-te-aparangi',
    redirectTo: 'subhub/royal-society-te-aparangi',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/royal-society-te-aparangi/royal-society-marsden-fund',
    redirectTo: 'subhub/royal-society-marsden-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/royal-society-te-aparangi/royal-society-marsden-fund/marsden-fund-proposal-and-budget-advice',
    redirectTo: 'article/marsden-fund-proposal-and-budget-advice',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/royal-society-te-aparangi/royal-society-marsden-fund/marsden-fund-support-material',
    redirectTo: 'article/marsden-fund-support-material',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/royal-society-te-aparangi/royal-society-te-aparangi-tawhia-te-mana-research-fellowships',
    redirectTo: 'article/royal-society-te-aparangi-tawhia-te-mana-research-fellowships',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/royal-society-te-aparangi/royal-society-te-aparangi-catalyst-fund',
    redirectTo: 'article/royal-society-te-aparangi-catalyst-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/health-research-council',
    redirectTo: 'subhub/health-research-council',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/health-research-council/health-research-council-hrc-2026-project-and-programme-changes',
    redirectTo: 'article/health-research-council-hrc-2026-project-and-programme-changes',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/health-research-council/hrc-investment-rounds',
    redirectTo: 'article/hrc-investment-rounds',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/health-research-council/maori-health-advancement',
    redirectTo: 'article/maori-health-advancement',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/health-research-council/hrc-application-support',
    redirectTo: 'service/hrc-application-support',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/health-research-council/hrc-presentations-and-webinars',
    redirectTo: 'article/hrc-presentations-and-webinars',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/health-research-council/HRC-nga-kanohi-kitea-community-advancement-fund',
    redirectTo: 'article/HRC-nga-kanohi-kitea-community-advancement-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/national-research-collaborations',
    redirectTo: 'subhub/national-research-collaborations',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/national-research-collaborations/cores',
    redirectTo: 'article/cores',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/national-research-collaborations/national-research-collaborations-nrcs',
    redirectTo: 'article/national-research-collaborations-nrcs',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/domestic-funding/national-research-collaborations/nsc-and-core-contestable-funds-opportunities',
    redirectTo: 'article/nsc-and-core-contestable-funds-opportunities',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding',
    redirectTo: 'subhub/international-funding',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/find-international-funding-schemes',
    redirectTo: 'subhub/international-funding',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/us-federal-schemes',
    redirectTo: 'subhub/us-federal-schemes',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/us-federal-schemes/university-response-to-new-us-regulations',
    redirectTo: 'article/university-response-to-new-us-regulations',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/us-federal-schemes/us-federal-funding',
    redirectTo: 'article/us-federal-funding',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/us-federal-schemes/air-force-office-of-scientific-research-afosr',
    redirectTo: 'article/air-force-office-of-scientific-research-afosr',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/us-federal-schemes/congressionally-directed-medical-research-programs-cdmrp',
    redirectTo: 'article/congressionally-directed-medical-research-programs-cdmrp',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/us-federal-schemes/us-national-institutes-of-health',
    redirectTo: 'article/us-national-institutes-of-health',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/us-federal-schemes/office-of-naval-research-onr',
    redirectTo: 'article/office-of-naval-research-onr',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/horizon-europe-funding-guidance',
    redirectTo: 'article/horizon-europe-funding-guidance',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/international-research-partnerships-funding-guidance',
    redirectTo: 'article/international-research-partnerships-funding-guidance',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/other-international-funding-schemes',
    redirectTo: 'subhub/other-international-funding-schemes',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/other-international-funding-schemes/human-frontier-science-programme-hfsp',
    redirectTo: 'article/human-frontier-science-programme-hfsp',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/other-international-funding-schemes/spencer-foundation',
    redirectTo: 'article/spencer-foundation',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/other-international-funding-schemes/john-templeton-foundation',
    redirectTo: 'article/john-templeton-foundation',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-funding/other-international-funding-schemes/tech-research-funding-guidance',
    redirectTo: 'article/tech-research-funding-guidance',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding',
    redirectTo: 'subhub/internal-funding',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/research-development-fund',
    redirectTo: 'funding/research-development-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/transdisciplinary-ideation-fund',
    redirectTo: 'funding/transdisciplinary-ideation-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/researcher-skills-and-development-fund',
    redirectTo: 'funding/researcher-skills-and-development-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/global-research-engagement-fund-gref',
    redirectTo: 'funding/global-research-engagement-fund-gref',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/hikina-kia-tutuki',
    redirectTo: 'funding/hikina-kia-tutuki',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/covid-19-hardship-fund',
    redirectTo: 'funding/covid-19-hardship-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/covid-19-research-restart-fund',
    redirectTo: 'funding/covid-19-research-restart-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/fofongas-afi-pacific-partnership-programme',
    redirectTo: 'funding/fofongas-afi-pacific-partnership-programme',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/fofonga-tubu-researcher-capability-fund',
    redirectTo: 'funding/fofonga-tubu-researcher-capability-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/internal-funding/the-university-of-auckland-inventors-fund',
    redirectTo: 'funding/the-university-of-auckland-inventors-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-infrastructure/shared-research-infrastructure-fund',
    redirectTo: 'funding/shared-research-infrastructure-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-networks/wun-research-development-fund',
    redirectTo: 'funding/wun-research-development-fund',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/prizes-and-awards',
    redirectTo: 'subhub/prizes-and-awards',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/prizes-and-awards/ECREA',
    redirectTo: 'funding/ECREA',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/prizes-and-awards/REM',
    redirectTo: 'funding/REM',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/prizes-and-awards/research-impact-award',
    redirectTo: 'funding/research-impact-award',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/prizes-and-awards/te-rau-hiringa-professional-staff-research-excellence-award',
    redirectTo: 'funding/te-rau-hiringa-professional-staff-research-excellence-award',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/prizes-and-awards/Te-Taumata-Rangahau',
    redirectTo: 'subhub/Te-Taumata-Rangahau',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/prizes-and-awards/hood-fellowships',
    redirectTo: 'funding/hood-fellowships',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/prizes-and-awards/seelye-fellowships',
    redirectTo: 'funding/seelye-fellowships',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/prizes-and-awards/DVA',
    redirectTo: 'funding/DVA',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/national-and-international-prizes-and-awards',
    redirectTo: 'subhub/national-and-international-prizes-and-awards',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/national-and-international-prizes-and-awards/national-and-international-awards',
    redirectTo: 'article/national-and-international-awards',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/national-and-international-prizes-and-awards/the-prime-ministers-science-prizes',
    redirectTo: 'article/the-prime-ministers-science-prizes',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/national-and-international-prizes-and-awards/the-prime-ministers-science-prize',
    redirectTo: 'funding/the-prime-ministers-science-prize',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/national-and-international-prizes-and-awards/the-prime-ministers-science-communication-prize',
    redirectTo: 'funding/the-prime-ministers-science-communication-prize',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/national-and-international-prizes-and-awards/the-prime-ministers-macdiarmid-emerging-scientist-prize',
    redirectTo: 'funding/the-prime-ministers-macdiarmid-emerging-scientist-prize',
    pathMatch: 'full'
  },
  {
    path: 'research-project-management/identify-explore-and-create-opportunities/international-networks',
    redirectTo: 'subhub/international-networks',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/international-networks/apru',
    redirectTo: 'article/apru',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/international-networks/u21',
    redirectTo: 'article/u21',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/international-networks/wun',
    redirectTo: 'article/wun',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/funding-calendar',
    redirectTo: 'article/funding-calendar',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/gets',
    redirectTo: 'service/gets',
    pathMatch: 'full'
  },
  {
    path: 'identify-explore-and-create-opportunities/research-professional',
    redirectTo: 'service/research-professional',
    pathMatch: 'full'
  }
    // SCTASK0368795 end
] 