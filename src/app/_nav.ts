export const navigation = [

  {
    title: true,
    name: 'Administration'
  },

  {
    name: 'Les entités',
    url: '/entity/list',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      // text: 'NEW'
    }
  },

  {
    name: 'Les contacts',
    url: '/user/list',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      // text: 'NEW'
    }
  },

  {
    title: true,
    name: 'Dashboard'
  },
  {
    name: 'Graphiques',
    url: '/dashboard',
    icon: 'icon-speedometer',
  }

];
