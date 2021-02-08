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

  export enum CategoryId {
    All = 1,
    ResearchImpact,
    HeKorowaiMātauranga,
    Funding,
    Publishing,
    ResearchProfiles,
    FacilitiesAndEquipment,
    ComputingAndComputeResources,
    SoftwareAndInternetAccess,
    ResearchDataManagement,
    CollectionsAndDataRepositories,
    ResearcherLearningAndDevelopment,
    EthicsIntegrityAndCompliance,
    IntellectualPropertyAndCommercialism,
    ContractingAndConsultingServices,
    Governance,
    ResearchServiceProviders,
    ManagingYourResearchProject,
    Support,
    Equipment,
    Training,
    Software,
    Facilities,
    Guide,
    Person,
    Policies,
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
  
  export const categoryOptions = [
    { id: CategoryId.All, name: 'All Categories', icon: 'public', type: OptionType.Category },
    { id: CategoryId.Support, name: 'Service', icon: 'local_play', type: OptionType.Category },
    { id: CategoryId.Equipment, name: 'Equipment', icon: 'build', type: OptionType.Category },
    { id: CategoryId.Training, name: 'Training', icon: 'school', type: OptionType.Category },
    { id: CategoryId.Software, name: 'Software', icon: 'desktop_mac', type: OptionType.Category },
    { id: CategoryId.Facilities, name: 'Facility', icon: 'home', type: OptionType.Category },
    { id: CategoryId.Guide, name: 'Guide', icon: 'import_contacts', type: OptionType.Category },
    { id: CategoryId.Person, name: 'People', icon: 'face', type: OptionType.Category },
    { id: CategoryId.Policies, name: 'Policy', icon: 'gavel', type: OptionType.Category },
  ];

  export const categoryOptionsGQL = [
    { id: CategoryId.All, name: 'All Content', description: 'Explore all research categories', type: OptionType.Category, url: '/all' },
    { id: CategoryId.ResearchImpact, name: 'Research Impact', description: 'The contribution that research and creative practice makes to society, the environment and the economy, & benefits individuals, whānau, communities, organisations, New Zealand and the world', type: OptionType.Category, url: '/research-impact' },
    { id: CategoryId.HeKorowaiMātauranga, name: 'He Korowai Mātauranga', description: 'The work related to enabling and delivering on vision mātauranga in research at the University of Auckland', type: OptionType.Category, url: '/he-korowai-mātauranga' },
    { id: CategoryId.Funding, name: 'Funding', description: 'Research funders & funding application support available to researchers at the University of Auckland', type: OptionType.Category, url: '/funding' },
    { id: CategoryId.Publishing, name: 'Publishing', description: 'Information related to publishing/printing or otherwise making research available to access', type: OptionType.Category, url: '/publishing' },
    { id: CategoryId.ResearchProfiles, name: 'Research Profiles', description: 'Technology and systems to record and store research outputs and data on as well as tools for tracking research impact', type: OptionType.Category, url: '/research-profiles' },
    { id: CategoryId.FacilitiesAndEquipment, name: 'Facilities & Equipment', description: 'The facilities & equipment provided by the University of Auckland to researchers', type: OptionType.Category, url: '/facilities-and-equipment' },
    { id: CategoryId.ComputingAndComputeResources, name: 'Computing & Compute Resources', description: 'Access to advanced computing infrastructure and services e.g. High Performance Computing (HPC), virtual machines, cloud resources, and machine learning', type: OptionType.Category, url: '/he-korowai-mātauranga' },
    { id: CategoryId.SoftwareAndInternetAccess, name: 'Software & Internet Access', description: 'Information about the software and internet access provided at the University of Auckland', type: OptionType.Category, url: '/software-and-internet-access' },
    { id: CategoryId.ResearchDataManagement, name: 'Research Data Management', description: 'Policy, process, software, and support for research data management', type: OptionType.Category, url: '/research-data-management' },
    { id: CategoryId.CollectionsAndDataRepositories, name: 'Collections & Data Repositories', description: 'Data stores and resources available to researchers at the University of Auckland', type: OptionType.Category, url: '/collections-and-data-repositories' },
    { id: CategoryId.ResearcherLearningAndDevelopment, name: 'Researcher Learning & Development', description: 'Learning and training opportunities for researchers', type: OptionType.Category, url: '/researcher-learning-and-development' },
    { id: CategoryId.EthicsIntegrityAndCompliance, name: 'Ethics, Integrity & Compliance', description: 'Policy, process, software, and support for managing ethics, integrity, and compliance', type: OptionType.Category, url: '/ethics-integrity-and-compliance' },
    { id: CategoryId.IntellectualPropertyAndCommercialism, name: 'Intellectual Property & Commercialism', description: 'Policy, process, and advice for managing intellectual property in research', type: OptionType.Category, url: '/intellectual-property-and-commercialism' },
    { id: CategoryId.ContractingAndConsultingServices, name: 'Contracting & Consulting Services', description: 'Policy, process, and support services for managing external contractors and consultants in research projects as well as for researchers who provide consulting services', type: OptionType.Category, url: '/contracting-and-consulting-services' },
    { id: CategoryId.Governance, name: 'Governance', description: 'Governance, strategy and policy relating to research activities at Auckland University', type: OptionType.Category, url: '/governance' },
    { id: CategoryId.ResearchServiceProviders, name: 'Research Service Providers', description: 'Information relating to groups/centres who provide support services to researchers at the University of Auckland', type: OptionType.Category, url: '/research-service-providers' },
    { id: CategoryId.ManagingYourResearchProject, name: 'Managing your Research Project', description: 'Policy, process, and support services for the management and administration of research', type: OptionType.Category, url: '/managing-your-research-project' },
  ];
  
  export const menuOptions = [
    { name: 'Search', icon: 'search', routerLink: '/search', type: OptionType.Menu },
    { name: 'Browse', icon: 'view_list', routerLink: '', sublist: categoryOptions, type: OptionType.Menu },
    { name: 'Research Activities', icon: 'school', routerLink: '', sublist: researchActivityOptions, type: OptionType.Menu },
    { name: 'User Study', icon: 'people', routerLink: '/userStudy', type: OptionType.Menu },
    { name: 'Feedback', icon: 'thumbs_up_down', routerLink: '/feedback', type: OptionType.Menu },
    { name: 'Contact', icon: 'phone', routerLink: '/contact', type: OptionType.Menu },
    { name: 'About', icon: 'info', routerLink: '/about', type: OptionType.Menu }
  ];

  export const CategoryDisplayNames = {
    'Policies': 'Policy',
    'Support': 'Service',
    'Facilities': 'Facility',
    'Person': 'People'
  };
  