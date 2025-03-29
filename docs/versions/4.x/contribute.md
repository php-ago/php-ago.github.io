---
outline: deep
title: Contribute - 4.x
description: Learn how to contribute to Ago library by adding support for a new language
---

# Contribute
If you want to contribute a new language support, you need to follow these simple and easy steps. Let's add a Chinese Mandarin together in this guide. As a bonus, here is the [GitHub Commit](https://github.com/php-ago/ago/commit/46d43aff6b5c1c15d287a44dc80a1a594703407f) that adds Chinese Simplified language support.

## Step 1. Constant
To [`Lang.php`](https://github.com/php-ago/ago/blob/master/src/Lang.php) file add a new constant with [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code just below the last constant. Don't forget a little comment with the language name.

```php
final class Lang
{
    public const EN = 'en'; // English
    public const RU = 'ru'; // Russian
    public const UK = 'uk'; // Ukrainian
    public const NL = 'nl'; // Dutch
    public const DE = 'de'; // German
    public const ZH = 'zh'; // Chinese // [!code focus] // [!code ++]
```

## Step 2. Readme
Update [`README.md`](https://github.com/php-ago/ago/blob/master/README.md) file to let everybody know that we have added support for a new language. Add a new line to the **Supported Languages** section.

```md
## Supported Languages
| Flag | Language              | ISO 639-1 |
| ---- | --------------------- | --------- |
| 🇬🇧   | English               | `en`      |
| 🇷🇺   | Russian               | `ru`      |
| 🇺🇦   | Ukrainian             | `uk`      |
| 🇳🇱   | Dutch                 | `nl`      |
| 🇩🇪   | German                | `de`      |
| 🇨🇳   | Chinese Simplified    | `zh`      | // [!code focus] // [!code ++]
```

## Step 3. Translations
Translation files live in the [`/resources/lang/`](https://github.com/php-ago/ago/tree/master/resources/lang) directory of the project. Translation is a simple PHP with translations that are returned as a `LangSet` object.

I'll copy/paste `en.php` file to `zh.php` and change all the values to match Chinese Simplified. Here is the content of the new file:

```php
<?php

declare(strict_types=1);

use Serhii\Ago\Lang;
use Serhii\Ago\LangForm;
use Serhii\Ago\LangSet;

return new LangSet( // [!code focus:14]
    lang: Lang::ZH,
    format: "{num}{timeUnit}{ago}",
    ago: "前",
    online: "在线",
    justNow: "刚刚",
    second: new LangForm(other: "秒"),
    minute: new LangForm(other: "分钟"),
    hour: new LangForm(other: "小时"),
    day: new LangForm(other: "天"),
    week: new LangForm(other: "周"),
    month: new LangForm(other: "个月"),
    year: new LangForm(other: "年"),
);
```

Since Chinese Simplified doesn't have special forms for words, we can use `other` form for a default value. Also, you see the `format` field value? I don't want any spaces between characters, so I removed them.

For more information about these fields, you can check [What Can Be Overwritten](/4.x/configurations.html#what-can-be-overwritten) section.

## Step 4. Rules
Rules live in the [`/resources/rules.php`](https://github.com/php-ago/ago/blob/master/resources/rules.php) file. As you can see down below, rule argument names match the language form names that you defined in the translation file.

These rules will determine which form of the word to use based on the current number in the output. Let's add rules for Chinese Simplified.

```php
/**
 * @return array<string,Rule>
 */
return static function (int $num): array {
    $end = $num % 10;

    return [
        'en,nl,de' => new Rule(
            zero: $num === 0,
            one: $num === 1,
            two: $num === 2,
            few: $num > 1,
            many: $num > 1,
        ),
        'ru,uk' => new Rule(
            zero: $num === 0,
            one: $num === 1 || ($num > 20 && $end === 1),
            two: $num === 2,
            few: ($end === 2 || $end === 3 || $end === 4) && ($num < 10 || $num > 20),
            many: ($num >= 5 && $num <= 20) || $end === 0 || $end >= 5,
        ),
        'zh' => new Rule(), // [!code focus] // [!code ++]
    ];
};
```

For Chinese Simplified rules are the simplest you can get. In Chinese, you don't have to change the form of the word based on the number. So, I just say that `'zh' => new Rule(),`.

If you don't provide rules, it will default to the field `other`, which is the only field we have in the translation file. This is enough.

## Step 5. Tests
Tests for all translations live in [`/tests/Translations`](https://github.com/php-ago/ago/tree/master/tests/Translations) directory in the root of the project. You can copy one of the existing tests and change it whatever you want to match your language. Just make sure you have enough cases to cover specifics of your language.

:::tip PHPUnit Data Providers
If you don't know about [PHPUnit Data Providers](https://docs.phpunit.de/en/10.5/writing-tests-for-phpunit.html#data-providers) you might want to read about it first before you start writing tests.
:::

I'm not going to put the whole test here because it's long, but you can check this file on [GitHub](https://github.com/php-ago/ago/blob/master/tests/Translations/ChineseTest.php).

## Step 6. Changelog
Let everybody know that you have added support for a new language. Update [`CHANGELOG.md`](https://github.com/php-ago/ago/blob/master/CHANGELOG.md) file with a new line:

```md
# Release Notes

## 4.1.0 (2025-01-01) // [!code focus:3] // [!code ++:3]
- 🇨🇳 Add Chinese Simplified language support

## 4.0.0 (2024-12-11)
> 🚀 [Upgrade Guide from 3.x to 4.x](https://php-ago.github.io/4.x/upgrade)
```

## Step 7. Checks
The last and final step is to run a custom command `composer check` to make sure everything is fine. It will run tests and static analysis tools to ensure that everything is working as expected before committing your changes.

```bash
composer check
```
