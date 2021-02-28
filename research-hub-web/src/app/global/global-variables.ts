export enum ActionTypeId {
  Integrated = 1,
  ExternalUrl,
  ExternalMailTo
}

export enum RoleTypeId {
  ServiceOwner = 1,
  CopyOwner,
  UserSupport
}

export enum ContentTypeId {
  Support = 1,
  Equipment,
  Training,
  Software,
  Facilities,
  KnowledgeArticle,
  Guide
}

export enum OptionType {
    ResearchActivity = 1,
    Category,
    Menu
  }
  
export enum ResearchActivityId {
    PlanDesign = 1,
    CreateCollectCapture,
    AnalyzeInterpret,
    PublishReport,
    DiscoverReuse
  }

export const researchActivityOptions = [
  {
    id: ResearchActivityId.PlanDesign,
    name: 'Plan & Design',
    className: 'plan',
    description: 'Resources to support the planning and design process of your research',
    type: OptionType.ResearchActivity
  },
  {
    id: ResearchActivityId.CreateCollectCapture,
    name: 'Create, Collect & Capture',
    className: 'create',
    description: 'Learn how to create and collect your research data effectively',
    type: OptionType.ResearchActivity
  },
  {
    id: ResearchActivityId.AnalyzeInterpret,
    name: 'Analyze & Interpret',
    className: 'analyze',
    description: 'Resources to support analyzing and interpreting the results of your research data',
    type: OptionType.ResearchActivity
  },
  {
    id: ResearchActivityId.PublishReport,
    name: 'Publish & Report',
    className: 'publish',
    description: 'Publishing and reporting the findings of your research',
    type: OptionType.ResearchActivity
  },
  {
    id: ResearchActivityId.DiscoverReuse,
    name: 'Discover & Reuse',
    className: 'discover',
    description: 'Discover other research publications and reuse them for your research project',
    type: OptionType.ResearchActivity
  }
];

export const Message = "The computational demands of today's research questions often require highly specialised computing and storage infrastructure, along with advanced software tools and services. The Centre for eResearch pioneers the development of such infrastructure and services on behalf of the University's research communities. We work hand-in-hand with researchers to help them leverage computational advances in pursuit of their own research questions. To this end we aim to provide sophisticated computing environments, advanced storage solutions for managing large research data collections, and a variety of productivity and community support software tools. The centre also plays a key role in providing leadership in eResearch at the national level, hosting both the BeSTGRID grid middleware and the New Zealand eScience Infrastructure (NeSI) at the University of Auckland. Our vision at the Centre for eResearch is to be a nationally and internationally influential community of eResearch practitioners, developers and thought leaders. We aim to excel in facilitating the research of others, as well as contributing to the evolving research themes within the field of eResearch itself. The information on this website will give you a real sense of the many different kinds of services we provide and the wide range of researchers and research communities that we partner with. If you would like to find out more, or how the centre might help you with your computational needs, please do not hesitate to get in touch with our staff.";

export const userStudyLink = "https://docs.google.com/forms/d/e/1FAIpQLSeXhrPKLqmdAr_r3aUwY9zyPa5REWJs63FQdmNwRbXKBUS8WQ/viewform";
export const feedbackLink = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
export const aboutUs = "https://www.eresearch.auckland.ac.nz/?_ga=2.69549080.943707055.1614124973-1995817083.1603163706#";