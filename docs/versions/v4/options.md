---
outline: deep
title: Options - v4
---

# Options
The `trans` method is [variadic](https://en.wikipedia.org/wiki/Variadic_function) and accepts multiple options. You can pass them as a list of arguments separated by commas.

```php
use Serhii\Ago\TimeAgo;
use Serhii\Ago\Option;

$output = TimeAgo::trans('now - 30 seconds', Option::ONLINE);

echo $output; // "Online"
```

Here are more examples with different options:

```php
use Serhii\Ago\Option;
use Serhii\Ago\TimeAgo;

echo TimeAgo::trans('yesterday'); // "1 day ago"
echo TimeAgo::trans('yesterday', Option::NO_SUFFIX); // "1 day"
echo TimeAgo::trans(time(), Option::ONLINE); // "Online"
echo TimeAgo::trans(time(), Option::JUST_NOW); // "Just now"
```

## Available options
All options are available in [Serhii\Ago\Option](https://github.com/php-ago/ago/blob/main/src/Option.php) enum.

| Option    | Description |
| --------- | ----------- |
| `ONLINE`    | Display "Online" if date interval within 60 seconds. After 60 seconds output will be the same as usually "x time ago" format. Incompatible with option `JUST_NOW`. |
| `NO_SUFFIX` | Remove suffix from date and have `5 minutes` instead of `5 minutes ago`. |
| `JUST_NOW`  | Prints `Just now` when time is within 1 minutes. For example instead of `34 seconds ago` it will print `Just now`. Incompatible with option `ONLINE`. |
| `UPCOMING`  | Removes the suffix ago when the date is in the future. **This option is enabled by default, there is no need to pass it. It's available for internal use**. |
| `RESET_CONF`  | Resets your configuration to default values. It's especially useful in testing when you need to reset the configuration to default values. |