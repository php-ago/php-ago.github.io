---
outline: deep
search: false
title: Get Started - v3
---

:::danger Outdated version
You are viewing the outdated version of Ago library. [Switch to the latest version](/) to get all the new features and improvements
:::

# Get Started
Date/time converter into "n time ago" format that supports multiple languages. You can [contribute](/contribute) any language that you wish easily by creating a pull request. I would gladly merge it in if you follow the simple steps.

This library is well tested, optimized and already used in many production apps. It has shown itself pretty well. If you find any issues or bugs 🐞, please create an [issue](https://github.com/php-ago/ago/issues/new), and I'll fix it as soon as I can.


## Quick Start
To use Ago, first, you need to install it via [Composer](https://getcomposer.org/) package manager and have minimum PHP version `7.1`.

```bash
composer require serhii/ago:3.2.6
```

## Supported PHP versions
Ago tries to support as many PHP versions as possible. Here is the list of supported PHP versions:

- ✅ 7.1
- ✅ 7.2
- ✅ 7.3
- ✅ 7.4
- ✅ 8.0
- ✅ 8.1
- ✅ 8.2
- ✅ 8.3
- ✅ 8.4

## Supported languages
| Flag | Language  | Code [(ISO 639-1)](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) |
| ---- | --------- | -------------------------------------------------------------------------------- |
| 🇬🇧    | English   | en                                                                               |
| 🇷🇺    | Russian   | ru                                                                               |
| 🇺🇦    | Ukrainian | uk                                                                               |
| 🇳🇱    | Dutch     | nl                                                                               |
| 🇩🇪    | German    | de                                                                               |

:::tip Keep updated
Make sure to update the library to the latest version to get the latest languages support.
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