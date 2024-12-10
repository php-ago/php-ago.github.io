---
outline: deep
title: Upgrade Guide - v4
description: Learn how to upgrade Ago library from v3 to v4
---

# Upgrade Guide from v3 to v4
Version `4.0` has gotten a lot of improvements and changes. The good news is that the upgrade process is straightforward and easy. We've documented every step you need to take to upgrade your application from `v3` to `v4`.

It will take you 5 to 10 minutes to complete the upgrade, depending on the complexity of your application and the amount of configuration you have.

:::tip
Some steps marked as <Badge type="warning" text="possible" />, because you might not need to do them if you don't use the configuration or feature that is mentioned in the step.
:::

## Step 1: Upgrade `composer.json` file
The first step is updating the `composer.json` file to use the latest version of Ago library. Change `serhii/ago` version to `^4.0`.

```json
{
    "require": {
        "serhii/ago": "^4.0"
    }
}
```

## Step 2: Change the Overrides <Badge type="warning" text="possible" />
If you are using custom translations (overwrites, overrides) to overwrite the default translations, you need to change the way you pass them. In `v4` we've changed the translation files structure to be more flexible and easier to use.

For example, take a look at the differences in structure for the Russian language:

::: code-group
```php [Old structure]
return [

    'ago' => 'назад',
    'just_now' => 'Только что',
    'online' => 'В сети',
    'second' => 'секунда',
    'seconds' => 'секунды',
    'seconds-special' => 'секунд',
    'minute' => 'минута',
    'minutes' => 'минуты',
    'minutes-special' => 'минут',
    'hour' => 'час',
    'hours' => 'часа',
    'hours-special' => 'часов',
    'day' => 'день',
    'days' => 'дня',
    'days-special' => 'дней',
    'week' => 'неделя',
    'weeks' => 'недели',
    'weeks-special' => 'недель',
    'month' => 'месяц',
    'months' => 'месяца',
    'months-special' => 'месяцев',
    'year' => 'год',
    'years' => 'года',
    'years-special' => 'лет',

];
```

```php [New structure]
return [
    "lang" => "ru",
    "format" => "{num} {timeUnit} {ago}",
    "ago" => "назад",
    "online" => "В сети",
    "justnow" => "Только что",

    "second" => [
        "one" => "секунда",
        "few" => "секунды",
        "other" => "секунд",
    ],
    "minute" => [
        "one" => "минута",
        "few" => "минуты",
        "other" => "минут",
    ],
    "hour" => [
        "one" => "час",
        "few" => "часа",
        "other" => "часов",
    ],
    "day" => [
        "one" => "день",
        "few" => "дня",
        "other" => "дней",
    ],
    "week" => [
        "one" => "неделя",
        "few" => "недели",
        "other" => "недель",
    ],
    "month" => [
        "one" => "месяц",
        "few" => "месяца",
        "other" => "месяцев",
    ],
    "year" => [
        "one" => "год",
        "few" => "года",
        "other" => "лет",
    ],
];

```
:::

The structure is uses [CLDR Specifications](https://cldr.unicode.org/index/cldr-spec/plural-rules) for the pluralization of the words. This allows you to have more flexibility in the translations and make them more accurate.

So if you use overwrites in you app, you need to update them to the new structure.

::: code-group
```php [Old way]
use Serhii\Ago\Lang;

Lang::set('en', [
    'ago' => 'before',
    'day' => 'Day',
    'days' => 'Days',
]);
```

```php [New way]
use Serhii\Ago\Lang;

Lang::set('en', [
    'ago' => 'before',
    'day' => 'Day',
    'days' => 'Days',
]);
```
:::

## Step 3: Rename Named Argument <Badge type="warning" text="possible" />
I doubt that you are using named argument for the `Serhii\Ago\Trans::set($lang, $overwrites)` method, but if you do, you need to rename the second argument from `$overwrites` to `$overrides`.

::: code-group
```php{3} [Old way]
use Serhii\Ago\Lang;

Lang::set(lang: 'en', overwrites: [
    'ago' => 'before',
    'day' => 'Day',
    'days' => 'Days',
]);
```

```php{3} [New way]
use Serhii\Ago\Lang;

Lang::set(lang: 'en', overrides: [
    'ago' => 'before',
    'day' => 'Day',
    'days' => 'Days',
]);
```
:::