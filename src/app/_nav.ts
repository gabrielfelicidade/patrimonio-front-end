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
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Consulta',
        url: '/patrimonios/consulta',
        icon: 'cui-arrow-right'
      },
      {
        name: 'Realizar Baixa',
        url: '/patrimonios/baixa',
        icon: 'cui-arrow-right'
      },
      {
        name: 'Baixados',
        url: '/patrimonios/baixados',
        icon: 'cui-arrow-right'
      }
    ]
  },
  {
    name: 'Localizações',
    url: '/localizacoes/consulta',
    icon: 'icon-location-pin'
  },
  {
    name: 'Métodos de Aquisição',
    url: '/metodos-aquisicao/consulta',
    icon: 'icon-credit-card'
  },
  {
    name: 'Usuários',
    url: '/usuarios/consulta',
    icon: 'icon-user'
  },
  {
    name: 'Alterar Senha',
    url: '/alterar-senha',
    icon: 'cui-lock-locked'
  },
  {
    name: 'Sair',
    url: '/sair',
    icon: 'icon-ban'
  },
];
