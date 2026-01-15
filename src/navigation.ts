import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Home', href: getPermalink('/') },

    {
      text: 'Blog',
      links: [
        { text: 'Blog List', href: getBlogPermalink() },
      ],
    },

    {
      text: 'Pages',
      links: [
        { text: 'Category Page', href: getPermalink('tutorials', 'category') },
        { text: 'Tag Page', href: getPermalink('astro', 'tag') },
      ],
    },

    { text: 'About me', href: getPermalink('/about') },
  ],

};

export const footerData = {
  links: [
    { links: [{ text: 'Support', href: '#' }] },
    { links: [{ text: 'About', href: '#' }] },
  ],
    socialLinks: [
      {
        ariaLabel: 'GitHub',
        icon: 'tabler:brand-github',
        href: 'https://github.com/Haileon',
        label: "https://github.com/Haileon",
      },
      {
        ariaLabel: 'Email',
        icon: 'tabler:mail',
        href: 'mailto:qye9828@gmail.com',
        label: 'qye9828@gmail.com',
        copyText: 'qye9828@gmail.com',
      },
      {
        ariaLabel: 'QQ',
        icon: 'tabler:brand-qq',
        href: "https://wpa.qq.com/msgrd?v=3&uin=12345678&site=qq&menu=yes",
        label: '2188832247',
        copyText: '2188832247',
        qrSrc: '/qq.png',
      },
    ],

  // compute year in TS, not inside the string:
  footNote: `© ${new Date().getFullYear()} QingYe. All rights reserved.`,
};
