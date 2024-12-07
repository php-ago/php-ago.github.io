---
outline: deep
title: Usage Guide - v4
---

# Usage Guide
The main interaction with the library is through the `Serhii\Ago\TimeAgo` class that provides a simple and intuitive API to convert dates to human-readable strings.

The main method that you will use is `trans(date, ...options)`, which stands for translate. It accepts a date in various formats and returns the final final output. Let's look at what formats you can pass to this method.

## Supported Formats
As the first argument, the `trans(date, ...options)` method accepts the following formats:

| Type     | Description | Example |
| -------- | ----------- | ------- |
| `int`    | Unix timestamp that can be returned from the `time()` or `strtotime()` functions | `1733493575` |
| `string` | Any date string supported by the PHP's `DateTime` constructor. Refer to [DateTime](https://www.php.net/manual/en/class.datetime.php) docs to learn about string formats | `2024-12-06 12:00:00` |
| `DateTime` | An instance of the `DateTime`, `DateTimeImmutable` or any other class that follows PHP's [DateTimeInterface](https://www.php.net/manual/en/class.datetimeinterface.php). It could an instance of external libraries like `Carbon` from `nesbot/carbon` package, since it also follows the `DateTimeInterface` | `new DateTime('now')` |

## Simple Usage
For basic usage, simply provide a past or future date, and the library will calculate and output the time interval relative to that date.

```php
use Serhii\Ago\TimeAgo;

$createdAt = strtotime('now - 33 minutes');
$output = TimeAgo::trans($createdAt);

echo $output; // Output: 33 minutes ago
```

When you pass the future date, it removes the unnecessary suffix. It's very convenient for outputting the time left until a certain event to make a user-friendly countdown.

```php
use Serhii\Ago\TimeAgo;

$toNewYear = strtotime('midnight 1 January next year');
$output = TimeAgo::trans($toNewYear);

echo $output; // Outputs time left to New Year
```

## Other

```php
use Serhii\Ago\TimeAgo;

TimeAgo::trans('now - 10 seconds'); // output: 10 seconds ago
TimeAgo::trans(time() - 86400); // output: 1 day ago
TimeAgo::trans(\Carbon\Carbon::now()->subDay()); // output: 1 day ago
TimeAgo::trans(\Carbon\CarbonImmutable::now()->subDay()); // output: 1 day ago
TimeAgo::trans((new \DateTime('now - 5 minutes'))); // output: 5 minutes ago
TimeAgo::trans((new \DateTimeImmutable('now - 5 minutes'))); // output: 5 minutes ago
```