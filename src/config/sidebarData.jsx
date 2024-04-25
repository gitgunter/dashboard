import {
  Home04,
  Book02,
  Note,
  StickyNote02,
  Hourglass,
  Timer02,
  ThumbsUpDown,
} from '@icons/index';

import css from '@components/dashboard/Sidebar/Sidebar.module.css';

const sidebarData = [
  {
    section: 'General',
    items: [
      {
        icon: <Home04 size={20} className={css.icon} />,
        label: 'Resumen',
        link: '/',
      },
      {
        icon: <Book02 size={20} className={css.icon} />,
        label: 'Temario',
        link: '/temario',
      },
      {
        icon: <Note size={20} className={css.icon} />,
        label: 'Exámenes',
        link: '/examenes',
      },
      {
        icon: <StickyNote02 size={20} className={css.icon} />,
        label: 'Notas',
        link: '/notas',
      },
    ],
  },
  {
    section: 'Modalidades',
    items: [
      {
        icon: <Hourglass size={20} className={css.icon} />,
        label: 'Quick test',
        link: '/modalidades/quick-test',
      },
      {
        icon: <Timer02 size={20} className={css.icon} />,
        label: 'Un minuto',
        link: '/modalidades/un-minuto',
      },
      {
        icon: <ThumbsUpDown size={20} className={css.icon} />,
        label: 'Verdad o falso',
        link: '/modalidades/verdad-falso',
      },
    ],
  },
];

export default sidebarData;
