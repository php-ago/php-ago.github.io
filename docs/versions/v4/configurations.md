---
outline: deep
title: Configurations - v4
description: Learn how to configure Ago library in your application
---

# Configurations
You can update the library configuration using the `TimeAgo::configure` or `TimeAgo::reconfigure` method, both of which accept a `Serhii\Ago\Config` class. These methods can be called anywhere in your codebase, as long as they are called before the `TimeAgo::trans` method. If not, the library will fall back to the default configuration.

## Configuration Options

### `configure` to Merge
The `TimeAgo::configure` method lets you update specific settings without altering the rest of the configuration. **It merges the new settings with the existing ones**, ensuring that previously configured values are preserved. This is ideal for incremental updates when you only need to adjust certain parameters.

### `reconfigure` to Replace
Use the `TimeAgo::reconfigure` method to **completely replace the current configuration**. This function resets all settings to their default values before applying the new configuration, ensuring a clean slate for your updates.

:::tip Reset Configuration Option
You also have a `Serhii\Ago\Option::RESET_CONF` option to reset the configuration before getting the processed date output. This is useful when you want to have a clean slate for the output. Read about it in the [Options](/v4/options) section.
:::

## Available Configurations
The list of all available configurations that you can change through the `Serhii\Ago\Config` class. This will be extended in the next releases.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| [lang](/v4/configurations.html#change-language) | `string` | `Lang::EN` | [Language code](/v4/what-is-ago.html#supported-languages) of the output following the [ISO 639-1 Standard](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) |
| [overwrites](/v4/configurations.html#ovewrite-translations) | `LangOverwrite[]` | `[]` | Custom translations for the language |

## Change Language
Default language is English. Optionally you can change the language in your application by passing one of the values on `Serhii\Ago\Lang` static class, or you can pass a string with the language code like `'ru'`, `'en'`, `'nl'`, etc.

```php [TimeAgo::configure]
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Config;
use Serhii\Ago\Lang;

$config = new Config(lang: Lang::RU);
TimeAgo::reconfigure($config);
```

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

echo TimeAgo::trans('now'); // output: "Live"
```

Now, when you call the `TimeAgo::trans` method, you will get `Live` instead of `Online` if you time is less than a certain threshold.

### What Can Be Overwritten?
There are many things you can overwrite, everything defined in the [`Serhii\Ago\LangOverwrite`](https://github.com/php-ago/ago/blob/main/src/LangOverwrite.php) class can be changed.

- `lang` - Language code [ISO 639-1 Standard](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) that you want to overwrite
- `format` - Format of the final output
- `ago` - Suffix for the final output, like "ago"
- `online` - Is shown when the date is without a small threshold
- `justNow` - Is shown when the date is within a small threshold with `Option::JUST_NOW` enabled
- `second` - Language form, [`LangForm::class`](https://github.com/php-ago/ago/blob/main/src/LangForm.php)
- `minute` - Language form, [`LangForm::class`](https://github.com/php-ago/ago/blob/main/src/LangForm.php)
- `hour` - Language form, [`LangForm::class`](https://github.com/php-ago/ago/blob/main/src/LangForm.php)
- `day` - Language form, [`LangForm::class`](https://github.com/php-ago/ago/blob/main/src/LangForm.php)
- `week` - Language form, [`LangForm::class`](https://github.com/php-ago/ago/blob/main/src/LangForm.php)
- `month` - Language form, [`LangForm::class`](https://github.com/php-ago/ago/blob/main/src/LangForm.php)
- `year'` - Language form, [`LangForm::class`](https://github.com/php-ago/ago/blob/main/src/LangForm.php)

### Language Form `LangForm::class`
The `Serhii\Ago\LangForm` class is used for describing plural form of `day`, `hour`, `minute`, `second`, `week`, `month`, `year`. It allows you to have more flexibility in the translations and make them more accurate for rich languages that have several plural forms for numbers.

`LangForm` has only a single required parameter `other`, which is used as a default value if other values are not provided. You can also provide `zero`, `one`, `few` and `many` values if you need to have different translations for different plural forms.