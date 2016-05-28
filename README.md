# event-hub v5.0.1 [![Build Status](https://travis-ci.org/kt3k/event-hub.svg?branch=master)](https://travis-ci.org/kt3k/event-hub)

> dom as an event hub

***note*** `event-hub` depends on `jQuery` and [class-component](https://github.com/kt3k/class-component).

# Usage

```html
<script src="path/to/jquery.js"></script>
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



# License

MIT
