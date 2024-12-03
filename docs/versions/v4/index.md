---
outline: deep
title: Get Started - v4
---

# Get Started
Date/time converter into "n time ago" format that supports multiple languages. You can [contribute](/contribute) any language that you wish easily by creating a pull request. I would gladly merge it in if you follow the simple steps.

This package is well tested, optimized and already used in many production apps. It has shown itself pretty well. If you find any issues or bugs 🐞, please create an [issue](https://github.com/php-ago/ago/issues/new), and I'll fix it as soon as I can.


## Quick Start
For using this package, you need to install it via [composer](https://getcomposer.org/) package manager.
```bash
composer require serhii/ago
```

## Supported PHP versions
Here is the list of supported PHP versions that are tested and working well with this package.

- [8.1](https://www.php.net/releases/8.1/en.php)
- [8.2](https://www.php.net/releases/8.2/en.php)
- [8.3](https://www.php.net/releases/8.3/en.php)
- [8.4](https://www.php.net/releases/8.4/en.php)

## Supported languages
| Flag | Language  | String | Enum         |
| ---- | --------- | ------ | ------------ |
| 🇬🇧    | English   | `"en"` | `Locale::EN` |
| 🇷🇺    | Russian   | `"ru"` | `Locale::RU` |
| 🇺🇦    | Ukrainian | `"uk"` | `Locale::UK` |
| 🇳🇱    | Dutch     | `"nl"` | `Locale::NL` |
| 🇩🇪    | German    | `"de"` | `Locale::DE` |

:::tip Keep updated
Make sure to update the package to the latest version to get the latest languages support.
:::

## Usage
For outputting post publishing date or something else you can just pass the date to method `trans()`. It will count the interval between now and given date and returns needed format. The methods excepts a timestamp, date string, Carbon instance or DateTime.

```php
use Serhii\Ago\TimeAgo;

TimeAgo::trans('now - 10 seconds'); // output: 10 seconds ago
TimeAgo::trans(time() - 86400); // output: 1 day ago
TimeAgo::trans(\Carbon\Carbon::now()->subDay()); // output: 1 day ago
TimeAgo::trans(\Carbon\CarbonImmutable::now()->subDay()); // output: 1 day ago
TimeAgo::trans((new \DateTime('now - 5 minutes'))); // output: 5 minutes ago
TimeAgo::trans((new \DateTimeImmutable('now - 5 minutes'))); // output: 5 minutes ago
```

When you pass the date in the future, it will output the interval to this date. It's very convenient, because you can pass almost any date format and it will give you the correct output.

```php
TimeAgo::trans(time() + 86400); // output: 1 day
TimeAgo::trans('now + 10 minutes'); // output: 10 minutes
```

:::warning Version 2.2.0
If you use version less than `2.2.0`, `TimeAgo::trans()` method will except only a string type.
:::