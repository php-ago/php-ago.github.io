---
outline: deep
search: false
title: Configurations - v4
---

# Configurations

:::danger Outdated version
You are viewing the outdated version of Ago library. [Switch to the latest version](/) to get all the new features and improvements
:::

## Set language
Default language is English. Optionally you can set the language in your application by calling `set()` method and passing a flag `ru` for Russian or `en` for English language. You can see supported languages in the next section.

```php
Serhii\Ago\Lang::set('ru');
```

The list of all supported languages you can find in [Supported Languages](/#supported-languages) section.

## Overwrite translations
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