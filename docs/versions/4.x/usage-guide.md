---
outline: deep
title: Usage Guide - 4.x
description: Learn how to use Ago library in your application
---

# Usage Guide
The main interaction with the library is through the `Serhii\Ago\TimeAgo` class that provides a simple and intuitive API to convert dates to human-readable strings.

The main method that you will use is `trans(date, ...options)`, which stands for translate. It accepts a date in various formats and returns the final final output. Let's look at what formats you can pass to this method.

## Simple Usage
For basic usage, simply provide a past or future date, and the library will calculate and output the time interval relative to that date.

```php
use Serhii\Ago\TimeAgo;

$out = TimeAgo::trans('-33 minutes');

echo $out; // outputs "33 minutes ago"
```

When you pass the future date, it removes the unnecessary suffix. It's very convenient for outputting the time left until a certain event to make a user-friendly countdown.

```php
use Serhii\Ago\TimeAgo;

$out = TimeAgo::trans('midnight 1 January next year');

echo $out; // outputs time left to New Year
```

## Passing Other Inputs
Other than an integer timestamp, you can also pass other formats that you can read in the next section ["Supported Formats"](/4.x/usage-guide.html#passing-other-inputs).

### String Date
String date will be processed by the PHP's [`strtotime`](https://www.php.net/manual/en/function.strtotime.php) function with the server's timezone. Which is one of the most powerful function in PHP to parse about any English textual datetime description into a Unix timestamp.

```php
use Serhii\Ago\TimeAgo;

echo TimeAgo::trans('-10 seconds'); // "10 seconds ago"
```

### Unix Timestamp Date
Excepts a Unix timestamp, that is a number of seconds since the Unix Epoch (January 1 1970 00:00:00 GMT).

```php
use Serhii\Ago\TimeAgo;

echo TimeAgo::trans(time() - 86400); // "1 day ago"
```

### PHP's DateTime Class
You can also pass an instance of PHP's [DateTime](https://www.php.net/manual/en/class.datetime.php) or [DateTimeImmutable](https://www.php.net/manual/en/class.datetimeimmutable.php) classes.

```php
use Serhii\Ago\TimeAgo;
use DateTimeImmutable;
use DateTime;

$date = new DateTime('-5 minutes');
echo TimeAgo::trans($date); // "5 minutes ago"

$date = new DateTimeImmutable('+5 minutes');
echo TimeAgo::trans($date); // "5 minutes"
```

### External Libraries
Every class that implements PHP's [DateTimeInterface](https://www.php.net/manual/en/class.datetimeinterface.php) can be passed to the `TimeAgo::trans()` method, including external libraries like [Carbon](https://github.com/briannesbitt/Carbon).

```php
use Carbon\CarbonImmutable;
use Serhii\Ago\TimeAgo;
use Carbon\Carbon;

$date = Carbon::now()->subDay();
echo TimeAgo::trans(); // "1 day ago"

$date = CarbonImmutable::now()->subDay();
echo TimeAgo::trans($date); // "1 day ago"
```

## Supported Formats
As the first argument, the `trans(date, ...options)` method accepts the following formats:

| Type     | Description | Example |
| -------- | ----------- | ------- |
| `int`    | Unix timestamp that can be returned from the `time()` or `strtotime()` functions | `1733493575` |
| `string` | Any date string supported by the PHP's `DateTime` constructor. Refer to [DateTime](https://www.php.net/manual/en/class.datetime.php) docs to learn about string formats | `2024-12-06 12:00:00` |
| `DateTime` | An instance of the `DateTime`, `DateTimeImmutable` or any other class that follows PHP's [DateTimeInterface](https://www.php.net/manual/en/class.datetimeinterface.php). It could an instance of external libraries like [Carbon](https://github.com/briannesbitt/Carbon), since it also follows the `DateTimeInterface` | `new DateTime('now')` |
