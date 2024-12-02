import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'en-US',
    title: 'Ago',
    description:
        'Date/time converter into "n time ago" format that supports multiple languages',

    sitemap: {
        hostname: 'https://php-ago.github.io',
    },

    themeConfig: {
        footer: {
            message:
                'Released under the <a href="https://github.com/php-ago/ago/blob/main/LICENSE.md" target="_blank">MIT License</a>',
            copyright:
                'Copyright © 2019 - present <a href="https://serhii.io/about-me" target="_blank">Serhii Chornenkyi (Serhii Cho)</a>',
        },

        sidebar: [
            { text: 'Documentation', link: '/' },
            { text: 'Configurations', link: '/configurations' },
            { text: 'Options', link: '/options' },
            { text: 'Contribute', link: '/contribute' },
        ],

        search: {
            provider: 'local',
        },

        nav: [
            {
                text: 'Documentation',
                link: '/',
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
})
