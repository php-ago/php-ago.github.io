--
title: Docs
--

# Documentation

Date/time converter into "n time ago" format that supports multiple languages. You can contribute any language that you wish easily by creating a pull request. I would gladly merge it in if you follow the simple steps.

This package is well tested, optimized and already used in many production apps. It has shown itself pretty well. If you find any issues or bugs 🐞, please create an [issue](https://github.com/SerhiiCho/ago/issues/new), and I'll fix it as soon as I can.

## 🐘 Supported PHP versions

- ✅ 7.1
- ✅ 7.2
- ✅ 7.3
- ✅ 7.4
- ✅ 8.0
- ✅ 8.1

## ⚙️ Configurations

### Set language

Default language is English. Optionally you can set the language in your application by calling `set()` method and passing a flag `ru` for Russian or `en` for English language. You can see supported languages in the next section.

```php
Serhii\Ago\Lang::set('ru');
```

### Supported languages

| Flag | Language | Code (ISO 639-1) |
| --- | --- | --- |
| 🇬🇧 | English | en |
| 🇷🇺 | Russian | ru |
| 🇺🇦 | Ukrainian | uk |
| 🇳🇱 | Dutch | nl |

### Overwrite translations
There are cases when you want to replace certain words with specific ones. You can do it with “Overwrites”. All you need to do is just to pass `array<string, string>` of values that you want to overwrite.

For example, instead of `1 minute ago` you want to have the output `1 minute before`. To achieve that, create `['ago' => 'before']` array and pass it as the second argument to method `set()` in `Serhii\Ago\Lang` class.

```php
Lang::set('en', [
    'ago' => 'before',
    'day' => 'Day',
    'days' => 'Days',
]);
```

> The list of all default key values you can find in [resources/lang](https://github.com/SerhiiCho/ago/tree/master/resources/lang) directory.

## 👏 Usage

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


> If you use version `< 2.2.0` then `TimeAgo::trans()` method except only type string.

## 🤲 Options

As the seconds argument `trans` method excepts array of options or single option. Here is an example of passed options.

```php
use Serhii\Ago\Option;
use Serhii\Ago\TimeAgo;

TimeAgo::trans('yesterday'); // 1 day ago
TimeAgo::trans('yesterday', Option::NO_SUFFIX); // 1 day
TimeAgo::trans(time(), Option::ONLINE); // Online
TimeAgo::trans(time(), Option::JUST_NOW); // Just now
```

### Available options

All options are available in `Serhii\Ago\Option::class` as constants.

| Option | Description |
| --- | --- |
| ONLINE | Display "Online" if date interval within 60 seconds. After 60 seconds output will be the same as usually "x time ago" format. Incompatible with option `JUST_NOW` |
| NO_SUFFIX | Remove suffix from date and have "5 minutes" instead of "5 minutes ago". |
| JUST_NOW | Prints `Just now` when time is within 1 minutes. For example instead of `34 seconds ago` it will print `Just now`. Incompatible with option `ONLINE`. |

## 🚀 Quick Start

```bash
composer require serhii/ago
```