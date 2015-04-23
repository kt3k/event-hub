# event-hub v1.0.0

> dom as an event hub

***note*** `event-hub` depends on `jQuery` and [custom-class](https://github.com/kt3k/custom-class).

# Usage

```html
<script src="path/to/jquery.js"></script>
<script src="path/to/custom-class.js"></script>
<script src="path/to/event-hub.js"></script>


<div class="event-hub" channel="click">

    <div>DIV 1</div>

    <div class="sub-click">DIV 2</div>

    <div>DIV 3</div>

</div>
```

The `channel` attribute specify which events are the channel of the event hub. (If you want to set multiple channels, set as `click mouseover` (in space-separated form)).

The `sub-click` class on the 2nd div in the event-hub means that the div subscribes to `click` event of the event-hub.

With the above settings, all the `click` events which occur under the event hub is published to the 2nd div.

See the [DEMO](https://kt3k.github.io/event-hub/test.html).



# License

MIT
