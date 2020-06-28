/* Environment settings for running in local mode using the deploy project. */
export const environment = {
  production: false,
  shibbolethSessionUrl: (<any>window)._env.shibbolethSessionUrl || '',
  researchHubApiUrl: (<any>window)._env.researchHubApiUrl || '',
  cerApiUrl: (<any>window)._env.cerApiUrl || '',
  analyticsCode: (<any>window)._env.analyticsCode || ''
};
