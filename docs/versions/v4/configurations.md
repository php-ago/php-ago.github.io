---
outline: deep
title: Configurations - v4
description: Learn how to configure Ago library in your application
---

# Configurations
You can update the library configuration using the `TimeAgo::configure` or `TimeAgo::reconfigure` method, both of which accept a `Config` class. These methods can be called anywhere in your codebase, as long as they are called before the `TimeAgo::trans` method. If not, the library will fall back to the default configuration.

## Configuration Options

### `configure`
The `TimeAgo::configure` method lets you update specific settings without altering the rest of the configuration. It merges the new settings with the existing ones, ensuring that previously configured values are preserved. This is ideal for incremental updates when you only need to adjust certain parameters.

### `reconfigure`
Use the `TimeAgo::reconfigure` method to completely replace the current configuration. This function resets all settings to their default values before applying the new configuration, ensuring a clean slate for your updates.

## Available Configurations

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| [lang](/v4/configurations.html#change-language) | `Lang` | `"en"` | [Language](/v4/what-is-ago.html#supported-languages) of the output |
| [overwrites](/v4/configurations.html#ovewrite-translations) | `array<int,LangSet>` | `[]` | Custom translations for the language |

## Example of Usage
Let's take a look at the most simple example of how you can configure the library. Let's say we want to set current language to Russian and overwrite the `В сети` translation to `Онлайн`, which are both mean `Online` in English.

```php
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Config;
use Serhii\Ago\Lang;
use Serhii\Ago\LangOverwrite;

$config = new Config(
    lang: Lang::RU,
    overwrites: [
        new LangOverwrite([
            lang: Lang::RU,
            online: 'Онлайн',
        ]),
    ],
);

TimeAgo::reconfigure($config);
```

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