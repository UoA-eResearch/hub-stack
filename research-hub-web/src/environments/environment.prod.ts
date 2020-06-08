export const environment = {
  production: true,
  researchHubApiUrl: (<any>window)._env.researchHubApiUrl || '',
  cerApiUrl: (<any>window)._env.cerApiUrl || '',
  analyticsCode: (<any>window)._env.analyticsCode || ''
};
