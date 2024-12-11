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

## Step 1: Upgrade `composer.json`
The first step is updating the `composer.json` file to use the latest version of Ago library. Change `serhii/ago` version to `^4.0`.

```json
{
    "require": {
        "serhii/ago": "^4.0"
    }
}
```

## Step 2: Composer Update
Run the update command to update the Ago library to the version `^4.0`

```bash
composer update serhii/ago:^4.0
```

If you have any issues or questions, feel free to ask in the [GitHub Discussions in the Q&A section](https://github.com/php-ago/php-ago.github.io/discussions/categories/q-a) for documentation.

## Step 3: Move Overwrites <Badge type="warning" text="possible" />
In the previous version, we used to pass the custom translations (overwrites) directly to the `Lang::set` method as a second argument. In `v4`, we define overwrites in the `Serhii\Ago\Config` class and pass them to the `TimeAgo::configure` or `TimeAgo::reconfigure` method.

If you have custom translations in your applications, they should look something like this:

```php
use Serhii\Ago\Lang;

Lang::set('en', [
    'ago' => 'before',
    'day' => 'Day',
    'days' => 'Days',
]);
```

Just move them to the `TimeAgo::configure` method for now. They will not work, but we will fix them in the next step.

```php
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Config;
use Serhii\Ago\Lang;

$config = new Config(overwrites: [
    [
        'ago' => 'before',
        'day' => 'Day',
        'days' => 'Days',
    ],
]);

TimeAgo::configure($config);
```

Now, follow the [Step 3](/v4/upgrade.html#step-3-change-overwrites) to update them to the new structure.

## Step 4: Change Overwrites <Badge type="warning" text="possible" />
If you are using custom translations (overwrites) to overwrite the default translations, you need to change the way you pass them. In `v4` we've changed the translation files structure to be more flexible and easier to use.

For example, take a look at the differences in structure for the Russian language:

::: code-group
```php [New structure]
use Serhii\Ago\Lang;
use Serhii\Ago\LangForm;
use Serhii\Ago\LangSet;

return new LangSet(
    lang: Lang::RU,
    format: "{num} {timeUnit} {ago}",
    ago: "назад",
    online: "В сети",
    justNow: "Только что",
    second: new LangForm(one: "секунда", few: "секунды", other: "секунд"),
    minute: new LangForm(one: "минута", few: "минуты", other: "минут"),
    hour: new LangForm(one: "час", few: "часа", other: "часов"),
    day: new LangForm(one: "день", few: "дня", other: "дней"),
    week: new LangForm(one: "неделя", few: "недели", other: "недель"),
    month: new LangForm(one: "месяц", few: "месяца", other: "месяцев"),
    year: new LangForm(one: "год", few: "года", other: "лет"),
);
```

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
:::

The structure is uses [CLDR Specifications](https://cldr.unicode.org/index/cldr-spec/plural-rules) for the pluralization of the words. This allows you to have more flexibility in the translations and make them more accurate. Overall, the new way is more type safe and easier to use than the old one.

So if you use overwrites in you app, you need to update them to the new structure and move them to `TimeAgo::configure`.

::: code-group
```php [New way]
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Config;
use Serhii\Ago\Lang;

$config = new Config(overwrites: [
    new LangOverwrite(
        lang: Lang::EN, // Which language to overwrite
        ago: 'before',
        day: new LangForm(one: 'Day', other: 'Days'),
    ),
]);

TimeAgo::configure($config);
```

```php [Old way]
use Serhii\Ago\Lang;

Lang::set('en', [
    'ago' => 'before',
    'day' => 'Day',
    'days' => 'Days',
]);
```
:::

For the full tutorial on how to use the new structure, check the [Overwrite Translations](/v4/configurations.html#ovewrite-translations) section. You can see there how to use the new API and how to make your translations more accurate.