

const coverImages = [
  'img1.jpg',
  'img22.jpg',
  'img55.jpg'
];

export const CoverImageURL = 'url(assets/images/' + coverImages[Math.floor(Math.random() * 2)] + ');';

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
    Equipment,
    Software,
    Articles,
    Events,
    SubHubs
  }
  
  export const researchActivityOptions = [
    {
      id: ResearchActivityId.PlanDesign,
      name: 'Plan & Design',
      className: 'plan',
      type: OptionType.ResearchActivity
    },
    {
      id: ResearchActivityId.CreateCollectCapture,
      name: 'Create, Collect & Capture',
      className: 'create',
      type: OptionType.ResearchActivity
    },
    {
      id: ResearchActivityId.AnalyzeInterpret,
      name: 'Analyze & Interpret',
      className: 'analyze',
      type: OptionType.ResearchActivity
    },
    {
      id: ResearchActivityId.PublishReport,
      name: 'Publish & Report',
      className: 'publish',
      type: OptionType.ResearchActivity
    },
    {
      id: ResearchActivityId.DiscoverReuse,
      name: 'Discover & Reuse',
      className: 'discover',
      type: OptionType.ResearchActivity
    }
  ];

  export const categoryOptionsGQL = [
    { id: CategoryId.All, name: 'All Content', icon: 'public', type: OptionType.Category, url: '/all' },
    { id: CategoryId.Equipment, name: 'Equipment', icon: 'build', type: OptionType.Category, url: '/equipment' },
    { id: CategoryId.Articles, name: 'Articles', icon: 'import_contacts', type: OptionType.Category, url: '/articles' },
    { id: CategoryId.Events, name: 'Events', icon: 'calendar_today', type: OptionType.Category, url: '/events' },
    { id: CategoryId.SubHubs, name: 'SubHubs', icon: 'build', type: OptionType.Category, url: '/subhubs' }
  ];
  
  export const menuOptions = [
    { name: 'Search', icon: 'search', routerLink: '/search', type: OptionType.Menu },
    { name: 'Browse', icon: 'view_list', routerLink: '', sublist: categoryOptionsGQL, type: OptionType.Menu },
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
  