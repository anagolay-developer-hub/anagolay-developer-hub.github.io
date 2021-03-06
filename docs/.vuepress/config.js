const { description } = require('../../package');
const DEPLOY_DOMAIN = 'https://anagolay.dev';
const pageSuffix = '/';
module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  // title: 'Anagolay Developers hub and Wiki',
  // /**
  //  * Ref：https://v1.vuepress.vuejs.org/config/#description
  //  */
  // description: 'All information on Anagolay Network',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    // ['link', { rel: 'icon', href: '/assets/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#D67EFF' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/asset/logo-letter.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
  ],
  dest: 'public',

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: 'default-prefers-color-scheme',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Anagolay Docs',
      description: 'Anagolay Developers hub and Wiki',
    },
  },
  markdown: {
    pageSuffix,
    extendMarkdown: md => {
      md.set({
        breaks: true,
      });
      md.use(require('markdown-it-video'));
      md.use(require('markdown-it-footnote'));
      md.use(require('markdown-it-task-lists'));
      md.use(require('markdown-it-deflist'));
      md.use(require('markdown-it-imsize'));
    },
  },
  themeConfig: {
    // defaultTheme: 'dark',
    // defaultTheme: 'light',
    defaultTheme: { light: [6, 18], dark: [18, 6] },
    displayAllHeaders: true,

    repo: 'https://gitlab.com/anagolay/docs',
    domain: DEPLOY_DOMAIN,
    docsRepo: 'https://gitlab.com/anagolay/docs',
    docsDir: 'docs',
    docsBranch: 'master',
    feedbackWidget: {
      docsRepoIssue: 'https://gitlab.com/anagolay/docs',
    },
    // editLinks: true,
    // editLinkText: 'Edit me',
    lastUpdated: true,
    logo: 'assets/logo.png',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Knowledge Base',
        link: '/about/',
      },
      // {
      //   text: 'Libraries',
      //   link: '/sdk/',
      // },
      {
        text: 'Tutorials',
        link: '/tutorials/',
      },
      {
        text: 'Glossary',
        link: '/glossary/',
      },
      // {
      //   text: 'FAQ',
      //   link: '/faq/',
      // },
    ],
    sidebar: {
      '/sdk/': ['', 'implemented-operations'],
      '/about/': ['', 'getting-started', 'operation', 'rule', 'proof-of-existence', 'statement'],
      '/tutorials/': ['setup-dev-env'],
      '/': ['', 'about/'],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    'vuepress-plugin-mermaidjs',
    '@vuepress/medium-zoom',
    ['vuepress-plugin-code-copy', true],
    [
      'vuepress-plugin-canonical',
      {
        stripExtension: true, // strip '.html' , optional, default: false
      },
    ],
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: pageSuffix,
        indexSuffix: pageSuffix,
        notFoundPath: '/404/',
      },
    ],
    'vuepress-plugin-ipfs',
    [
      '@vuepress/active-header-links',
      {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor',
        headerTopOffset: 120,
      },
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: 'New content is available.',
          buttonText: 'Refresh',
        },
      },
    ],
  ],
};
