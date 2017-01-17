# event-hub v6.2.1

> event hub on a dom tree

[![CircleCI](https://circleci.com/gh/kt3k/event-hub.svg?style=svg)](https://circleci.com/gh/kt3k/event-hub)

***note*** `event-hub` depends on [classcaps](https://github.com/kt3k/classcaps).

# Usage

```html
<script src="path/to/class-component.js"></script>
<script src="path/to/event-hub.js"></script>


<div class="event-hub" channel="click">

    <div>DIV 1</div>

    <div class="sub-click">DIV 2</div>

    <div>DIV 3</div>

</div>
```

The `channel` attribute specify which events are the channel of the `.event-hub`. (If you want to set multiple channels, set them like `click mouseover` (in space-separated form)).

The `sub-click` class on the 2nd element in the `.event-hub` means that it subscribes to `click` event of the `.event-hub`.

With the above settings, all the `click` events which occur under the `.event-hub` is published to the 2nd div.

See the [DEMO](https://kt3k.github.io/event-hub/test.html).

# API

```html
<tag class="event-hub" channel="ch0 ch1 ... ch_N"></tag>
```

- @class `event-hub` is the component name. You need to specify the class name in dom.
- @param {string[]} ch0, ch1,..., ch_N The channel which the event hub brokes.

If the event `ch_i` bubbles up to the above `event-hub` dom, then it dispatches the event to its children which has `sub-ch_i` class in it.

## Node API

You need to call `def` of classcaps to use event-hub.

```js
const { def } = require('classcaps')
const EventHub = require('event-hub')

def('event-hub', EventHub)
```

# License

MIT
