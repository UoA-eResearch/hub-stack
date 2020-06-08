/* Environment settings for running in local mode using the deploy project. */
export const environment = {
  production: false,
  researchHubApiUrl: (<any>window)._env.researchHubApiUrl || '',
  cerApiUrl: (<any>window)._env.cerApiUrl || '',
  analyticsCode: (<any>window)._env.analyticsCode || ''
};
