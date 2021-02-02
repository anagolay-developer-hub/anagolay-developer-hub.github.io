const { description } = require('../../package');

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Sensio Development portal',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'All information on Sensio Network, Protocol and Tutorials are found here',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],
  dest: 'public',

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: 'default-prefers-color-scheme',
  themeConfig: {
    // defaultTheme: 'dark',
    // defaultTheme: 'light',
    defaultTheme: { light: [6, 18], dark: [18, 6] },

    repo: 'https://gitlab.com/sensio_group/sensio_dev',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: 'Edit me',
    lastUpdated: true,
    logo: '/assets/logo-current-256.png',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Network',
        link: '/network/',
      },
      {
        text: 'Pallets',
        link: '/network/pallets/',
      },
      {
        text: 'Protocol',
        link: '/network/protocol/',
      },
      {
        text: 'Tutorials',
        link: '/tutorials/',
      },
      {
        text: 'Glossary',
        link: '/glossary/',
      },
      {
        text: 'FAQ',
        link: '/faq/',
      },
    ],
    sidebar: {
      '/network/protocol/': [
        {
          title: 'Core',
          collapsable: false,
          sidebarDepth: 2,
          children: ['operation', 'rule', 'proof', 'statement'],
        },
        {
          title: 'Diagrams',
          collapsable: false,
          sidebarDepth: 2,
          children: ['diagram-api-and-poe', 'diagram-generic', 'diagram-rules-execution'],
        },
      ],
      '/network/pallets/': [
        {
          title: 'Pallets',
          collapsable: false,
          sidebarDepth: 2,
          children: ['operations', 'rules', 'poe', 'statements'],
        },
      ],
      '/tutorials/': ['proof-of-existence-v0.1.0', 'camera-lens-verification', 'claim-copyright', 'setup-dev-env'],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-mermaidjs',
    '@vuepress/medium-zoom',
  ],
};
