---
outline: deep
title: Options
---

# Options
As the seconds argument `trans` method excepts array of options or single option. Here is an example of passed options.

```php
use Serhii\Ago\Option;
use Serhii\Ago\TimeAgo;

TimeAgo::trans('yesterday'); // 1 day ago
TimeAgo::trans('yesterday', Option::NO_SUFFIX); // 1 day
TimeAgo::trans(time(), Option::ONLINE); // Online
TimeAgo::trans(time(), Option::JUST_NOW); // Just now
```

## Available options
All options are available in `Serhii\Ago\Option::class` as constants.

| Option    | Description |
| --------- | ----------- |
| ONLINE    | Display "Online" if date interval within 60 seconds. After 60 seconds output will be the same as usually "x time ago" format. Incompatible with option `JUST_NOW` |
| NO_SUFFIX | Remove suffix from date and have "5 minutes" instead of "5 minutes ago". |
| JUST_NOW  | Prints `Just now` when time is within 1 minutes. For example instead of `34 seconds ago` it will print `Just now`. Incompatible with option `ONLINE`. |