---
outline: deep
title: Configurations - v4
description: Learn how to configure Ago library in your application
---

# Configurations
To make any configurations to the Ago, you need to pass the instance of `Serhii\Ago\Config` class to the `configure()` method of `Serhii\Ago\TimeAgo`. Optionally, you can also change some configurations with the help of `Serhii\Ago\Lang` class that you will see later in the [Change Language](/v4/configurations.html#change-language) section.

```php
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Config;
use Serhii\Ago\Lang;
use Serhii\Ago\LangOverwrite;

$config = new Config(
    lang: Lang::RU,
    customTranslations: [
        new LangOverwrite([
            lang: Lang::RU,
            online: 'Онлайн',
        ]),
    ],
);

TimeAgo::configure($config);
```

## Available Configurations

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| [lang](/v4/configurations.html#change-language) | `Lang` | `"en"` | [Language](/v4/what-is-ago.html#supported-languages) of the output |
| [overwrites](/v4/configurations.html#ovewrite-translations) | `array<int,LangSet>` | `[]` | Custom translations for the language |

## Change Language
Default language is English. Optionally you can change the language in your application by passing one of the values on `Serhii\Ago\Lang` static class. There are 2 ways of doing that. Using `TimeAgo::configure` and `Lang::set`.

::: code-group
```php [Lang::set]
use Serhii\Ago\Lang;

Lang::set(Lang::EN);
```

```php [TimeAgo::configure]
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Config;
use Serhii\Ago\Lang;

$config = new Config(lang: Lang::RU);

TimeAgo::configure($config);
```
:::

:::tip Supported Languages
The list of all supported languages you can find in [Supported Languages](/v4/what-is-ago.html#supported-languages) section.
:::

## Override Translations
There are cases when you want to replace certain translations with your own ones. For example, instead of `1 minute ago` you want to have the output `1m` or `1 min ago`. You can do it with "Overwrites". All you need to do is just to define everything you want to overwrite for a specific language.

Pass an array of overwrites to the configurations. Let's see how we can change the `Online` to `Live` in English language.

```php [TimeAgo::configure]
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Config;
use Serhii\Ago\Lang;

$config = new Config(overwrites: [
    new LangOverwrite(
        lang: Lang::EN,
        online: 'Live',
    ),
]);

TimeAgo::configure($config);
```

For example, instead of `1 minute ago` you want to have the output `1 minute before`. To achieve that, create `['ago' => 'before']` array and pass it as the second argument to method `set()` in `Serhii\Ago\Lang` class.

## TODO
The new `Serhii\Ago\LangForm` should be used for `day`, `hour`, `minute`, `second`, `week`, `month`, `year` translations. It allows you to have more flexibility in the translations and make them more accurate.

`LangForm` has only a single required parameter `other`, which is used as a default value if other values are not provided. You can also provide `zero`, `one`, `few` and `many` values if you need to have different translations for different plural forms.