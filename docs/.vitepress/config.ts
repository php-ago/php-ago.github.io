import type { HeadConfig, TransformContext } from 'vitepress'
import { defineVersionedConfig } from '@viteplus/versions'
import { latestVersion, outdatedVersions } from './theme/versions.ts'
import { resolve } from 'node:path'

const hostname = 'https://php-ago.serhiicho.com'

function setCanonicalTag(page: string): string {
    page = page.replace('.md', '.html')
    return page == 'index.html' ? hostname : `${hostname}/${page}`
}

export default defineVersionedConfig(
    {
        lang: 'en-US',
        title: 'Ago',
        description: 'Date/time converter into "n time ago" format that supports multiple languages',

        transformHead: (ctx: TransformContext) => {
            const head: HeadConfig[] = []
            head.push(['link', { rel: 'canonical', href: setCanonicalTag(ctx.page) }])
            return head
        },

        lastUpdated: true,

        vite: {
            resolve: {
                alias: {
                    '@': resolve(import.meta.dirname, './theme'),
                },
            },
        },

        sitemap: {
            hostname,
            // exclude old version pages from sitemap
            transformItems: items => items.filter(item => !outdatedVersions.some(p => item.url.startsWith(p))),
        },

        cleanUrls: true,

        versionsConfig: {
            current: latestVersion,
            versionSwitcher: false,
        },

        themeConfig: {
            footer: {
                message: 'Released under the <a href="https://codeberg.org/php-ago/ago/src/branch/master/LICENSE" target="_blank">MIT License</a>',
                copyright: `Copyright © 2019 - ${new Date().getFullYear()} <a href="https://serhiicho.com/about-me" target="_blank">Serhii Cho</a>`,
            },

            sidebar: {
                root: [
                    {
                        text: 'Guide',
                        items: [
                            { text: 'Get Started', link: '/get-started' },
                            { text: 'Usage Guide', link: '/usage-guide' },
                            { text: 'Configurations', link: '/configurations' },
                            { text: 'Options', link: '/options' },
                        ],
                    },
                    {
                        text: 'Information',
                        items: [
                            { text: 'Upgrade Guide', link: '/upgrade' },
                            { text: 'What is Ago?', link: '/what-is-ago' },
                            { text: 'Contribute', link: '/contribute' },
                        ],
                    },
                ],
                '3.x': [
                    {
                        text: 'Guide',
                        items: [
                            { text: 'Get Started', link: '/get-started' },
                            { text: 'Configurations', link: '/configurations' },
                            { text: 'Options', link: '/options' },
                        ],
                    },
                    {
                        text: 'Information',
                        items: [{ text: 'Contribute', link: '/contribute' }],
                    },
                ],
            },

            search: {
                provider: 'local',
            },

            nav: {
                root: [
                    { component: 'VersionSwitcher' },
                    {
                        text: 'Documentation',
                        link: '/get-started',
                    },
                    {
                        text: 'Release Notes',
                        link: 'https://codeberg.org/php-ago/ago/src/branch/master/CHANGELOG.md',
                    },
                ],
            },

            socialLinks: [
                {
                    icon: 'packagist',
                    ariaLabel: 'Packagist',
                    link: 'https://packagist.org/packages/serhii/ago',
                },
                {
                    icon: 'codeberg',
                    ariaLabel: 'Codeberg',
                    link: 'https://codeberg.org/php-ago/ago',
                },
            ],
        },
    },
)
