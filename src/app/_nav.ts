interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Página Inicial',
    url: '/home',
    icon: 'icon-home'
  },
  {
    name: 'Patrimônios',
    url: '/patrimonios',
    icon: 'icon-home'
  },
  {
    name: 'Localizações',
    url: '/localizacoes',
    icon: 'icon-home'
  },
  {
    name: 'Métodos de Aquisição',
    url: '/metodos-aquisicao',
    icon: 'icon-home'
  },
];
