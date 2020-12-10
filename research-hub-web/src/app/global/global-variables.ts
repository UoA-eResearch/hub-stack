

const coverImages = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img55.jpg',
  'img9.jpg',
];

export const CoverImageURL = 'url(assets/images/' + coverImages[Math.floor(Math.random() * 4)] + ');';

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
    Support,
    Equipment,
    Training,
    Software,
    Facilities,
    Guide,
    Person,
    Policies,
    Articles,
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
    { id: CategoryId.All, name: 'All Content', icon: 'public', type: OptionType.Category, url: '/all' },
    { id: CategoryId.Equipment, name: 'Equipment', icon: 'build', type: OptionType.Category, url: '/equipment' },
    { id: CategoryId.Articles, name: 'Articles', icon: 'import_contacts', type: OptionType.Category, url: '/articles' },
    { id: CategoryId.SubHubs, name: 'SubHubs', icon: 'build', type: OptionType.Category, url: '/subhubs' }
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
  