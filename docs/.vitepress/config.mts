import defineVersionedConfig from 'vitepress-versioning-plugin'

export default defineVersionedConfig(
    {
        lang: 'en-US',
        title: 'Ago',
        description:
            'Date/time converter into "n time ago" format that supports multiple languages',

        versioning: {
            latestVersion: '4.x',
        },

        lastUpdated: true,

        sitemap: {
            hostname: 'https://php-ago.github.io',

            // exclude old version pages from sitemap
            transformItems: items => {
                return items.filter(item => !item.url.startsWith('3.x/'))
            },
        },

        themeConfig: {
            versionSwitcher: false,

            footer: {
                message:
                    'Released under the <a href="https://github.com/php-ago/ago/blob/master/LICENSE" target="_blank">MIT License</a>',
                copyright: `Copyright © 2019 - ${new Date().getFullYear()} <a href="https://serhiicho.com/about-me" target="_blank">Serhii Cho</a>`,
            },

            sidebar: {
                '/3.x/': [
                    {
                        text: 'Guide',
                        items: [
                            { text: 'Get Started', link: '/3.x/' },
                            { text: 'Configurations', link: '/3.x/configurations' },
                            { text: 'Options', link: '/3.x/options' },
                        ],
                    },
                    {
                        text: 'Information',
                        items: [{ text: 'Contribute', link: '/3.x/contribute' }],
                    },
                ],
                '/4.x/': [
                    {
                        text: 'Guide',
                        items: [
                            { text: 'Get Started', link: '/4.x/' },
                            { text: 'Usage Guide', link: '/4.x/usage-guide' },
                            { text: 'Configurations', link: '/4.x/configurations' },
                            { text: 'Options', link: '/4.x/options' },
                        ],
                    },
                    {
                        text: 'Information',
                        items: [
                            { text: 'Upgrade Guide', link: '/4.x/upgrade' },
                            { text: 'What is Ago?', link: '/4.x/what-is-ago' },
                            { text: 'Contribute', link: '/4.x/contribute' },
                        ],
                    },
                ],
            },

            search: {
                provider: 'local',
            },

            nav: [
                {
                    component: 'VersionSwitcher',
                    props: {
                        versions: ['4.x', '3.x'],
                        latestVersion: '4.x',
                    },
                },
                {
                    text: 'Documentation',
                    link: '/4.x/',
                },
                {
                    text: 'Release Notes',
                    link: 'https://github.com/php-ago/ago/blob/master/CHANGELOG.md',
                },
            ],

            socialLinks: [
                {
                    icon: 'github',
                    ariaLabel: 'GitHub',
                    link: 'https://github.com/php-ago/ago',
                },
            ],
        },
    },
    // @ts-ignore
    __dirname,
)
