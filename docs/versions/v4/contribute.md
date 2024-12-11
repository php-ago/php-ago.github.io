---
outline: deep
title: Contribute - v4
description: Learn how to contribute to Ago library by adding support for a new language
---

# Contribute
If you want to contribute a new language support, you need to follow these simple and easy steps. Let's add a Chinese Mandarin together in this guide.

## Step 1. Create a new Constant
To [`Lang.php`](https://github.com/php-ago/ago/blob/main/src/Lang.php) file add a new constant with [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code just below the last constant. Don't forget a little comment with the language name.

```php
final class Lang
{
    public const EN = 'en'; // English
    public const RU = 'ru'; // Russian
    public const UK = 'uk'; // Ukrainian
    public const NL = 'nl'; // Dutch
    public const DE = 'de'; // German
    public const ZH = 'zh'; // Chinese // [!code ++]
```

## Step 2. Update README File
Update [`README.md`](https://github.com/php-ago/ago/blob/main/README.md) file to let everybody know that we have added support for a new language. Add a new line to the **Supported Languages** section.

```md
## Supported Languages
| Flag | Language              | ISO 639-1 |
| ---- | --------------------- | --------- |
| 🇬🇧   | English               | `en`      |
| 🇷🇺   | Russian               | `ru`      |
| 🇺🇦   | Ukrainian             | `uk`      |
| 🇳🇱   | Dutch                 | `nl`      |
| 🇩🇪   | German                | `de`      |
| 🇨🇳   | Chinese Simplified    | `zh`      | // [!code ++]
```

## Step 3. Add Translations
Translation files live in the [`/resources/lang/`](https://github.com/php-ago/ago/tree/main/resources/lang) directory of the project. Translation is a simple PHP with translations that are returned as a `LangSet` object.

I'll copy/paste `en.php` file to `zh.php` and change all the values to match Chinese Simplified. Here is the content of the new file:

```php
<?php

declare(strict_types=1);

use Serhii\Ago\Lang;
use Serhii\Ago\LangForm;
use Serhii\Ago\LangSet;

return new LangSet(
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

For more information about these fields, you can check [What Can Be Overwritten](/v4/configurations.html#what-can-be-overwritten) section.

## Step 4. Add Rules
Rules live in the [`/resources/rules.php`](https://github.com/php-ago/ago/blob/main/resources/rules.php) file.

```php{22-28}
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
        'zh' => new Rule(
            zero: $num === 0,
            one: $num === 1,
            two: $num === 2,
            few: true,
            many: true,
        ),
    ];
};
```

## Step 5. Adding Tests
Tests for all translations are live in `tests/Translations` directory. Just copy one of the existing tests and change it whatever you want to match your language. Just make sure you have enough cases to cover specifics of your language. If you don't know about [PHPUnit Data Providers](https://phpunit.de/manual/3.7/en/writing-tests-for-phpunit.html) you might want to read about it.