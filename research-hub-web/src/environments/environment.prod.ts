export const environment = {
  production: true,
  shibbolethSessionUrl: (<any>window)._env.shibbolethSessionUrl || '',
  researchHubApiUrl: (<any>window)._env.researchHubApiUrl || '',
  cerApiUrl: (<any>window)._env.cerApiUrl || '',
  analyticsCode: (<any>window)._env.analyticsCode || ''
};
