---
outline: deep
title: Configurations - v4
description: Learn how to configure Ago library in your application
---

# Configurations
To make any configurations to the Ago, you need to pass the instance of `Serhii\Ago\Config` class to the `configure()` method of `Serhii\Ago\TimeAgo`.

```php
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Config;
use Serhii\Ago\Lang;
use Serhii\Ago\LangSet;

$config = new Config(
    lang: Lang::RU,
    customTranslations: [
        new LangSet([
            'lang' => 'ru',
            'online' => 'Онлайн',
        ]),
    ],
);

TimeAgo::configure($config);
```

## Available Configurations

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| [lang](/v4/configurations.html#change-language) | `Lang` | `"en"` | [Language](/v4/what-is-ago.html#supported-languages) of the output |
| [overrides](/v4/configurations.html#override-translations) | `array<int,LangSet>` | `[]` | Custom translations for the language |

## Change Language
Default language is English. Optionally you can change the language in your application by passing one of the values on `Serhii\Ago\Lang` static class.

```php
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Config;
use Serhii\Ago\Lang;

$config = new Config(lang: Lang::RU);

TimeAgo::configure($config);
```

The list of all supported languages you can find in [Supported Languages](/v4/what-is-ago.html#supported-languages) section.

## Override Translations
There are cases when you want to replace certain words with specific ones. You can do it with “Overwrites”. All you need to do is just to pass `array<string, string>` of values that you want to overwrite.

For example, instead of `1 minute ago` you want to have the output `1 minute before`. To achieve that, create `['ago' => 'before']` array and pass it as the second argument to method `set()` in `Serhii\Ago\Lang` class.

```php
Lang::set('en', [
    'ago' => 'before',
    'day' => 'Day',
    'days' => 'Days',
]);
```

:::tip
The list of all default key values you can find in [resources/lang](https://github.com/php-ago/ago/tree/master/resources/lang) directory.
:::