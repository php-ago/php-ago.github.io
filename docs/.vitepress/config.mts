import defineVersionedConfig from 'vitepress-versioning-plugin'

export default defineVersionedConfig(
    {
        lang: 'en-US',
        title: 'Ago',
        description:
            'Date/time converter into "n time ago" format that supports multiple languages',

        versioning: {
            latestVersion: 'v4',
        },

        lastUpdated: true,

        sitemap: {
            hostname: 'https://php-ago.github.io',

            // exclude old version pages from sitemap
            transformItems: items => {
                return items.filter(item => !item.url.startsWith('v3/'))
            },
        },

        themeConfig: {
            versionSwitcher: false,
            footer: {
                message:
                    'Released under the <a href="https://github.com/php-ago/ago/blob/main/LICENSE" target="_blank">MIT License</a>',
                copyright:
                    'Copyright © 2019 - present <a href="https://serhii.io/about-me" target="_blank">Serhii Chornenkyi (Serhii Cho)</a>',
            },

            sidebar: {
                '/v3/': [
                    {
                        text: 'Guide',
                        items: [
                            { text: 'Get Started', link: '/v3/' },
                            { text: 'Configurations', link: '/v3/configurations' },
                            { text: 'Options', link: '/v3/options' },
                        ],
                    },
                    {
                        text: 'Information',
                        items: [{ text: 'Contribute', link: '/v3/contribute' }],
                    },
                ],
                '/v4/': [
                    {
                        text: 'Guide',
                        items: [
                            { text: 'Get Started', link: '/v4/' },
                            { text: 'Usage Guide', link: '/v4/usage-guide' },
                            { text: 'Configurations', link: '/v4/configurations' },
                            { text: 'Options', link: '/v4/options' },
                        ],
                    },
                    {
                        text: 'Information',
                        items: [
                            { text: 'Upgrade', link: '/v4/upgrade' },
                            { text: 'What is Ago?', link: '/v4/what-is-ago' },
                            { text: 'Contribute', link: '/v4/contribute' },
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
                        versions: ['v4', 'v3'],
                        latestVersion: 'v4',
                    },
                },
                {
                    text: 'Documentation',
                    link: '/v4/',
                },
                {
                    text: 'Release Notes',
                    link: 'https://github.com/php-ago/ago/blob/main/CHANGELOG.md',
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
