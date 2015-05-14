/**
 * event-hub.js v2.0.0
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 */


(function ($) {
    'use strict';

    $.registerClassComponent('event-hub', function () {

        var ehub = new EventHub(this);

        ehub.bindEvents();

    });


    /**
     */
    function EventHub(elem) {

        this.$elem = $(elem);

    };

    var pt = EventHub.prototype;

    /**
     * Gets channels.
     *
     * @return {Array}
     */
    pt.channels = function () {

        var channels = this.$elem.attr('channels') || this.$elem.attr('channel');

        console.log(channels);

        if (!channels) {
            return [];
        }

        return channels.replace(/^\s*|\s*$/g, '').split(/\s+/);

    };


    /**
     * Binds events.
     */
    pt.bindEvents = function () {

        this.channels().forEach(this.bindEventsForChannel, this);

    };


    /**
     * Binds to the given event (channel).
     *
     * The handler publish the event to the subscribers.
     *
     * @private
     */
    pt.bindEventsForChannel = function (channel) {

        var $elem = this.$elem;

        $elem.on(channel, function (e) {

            // if the event is already processed by the hub
            // then don't broadcast it again
            if (e._eventHubProcessed) {
                return;
            }

            // mark the event processed
            e._eventHubProcessed = true;

            var extraArgs = Array.prototype.slice.call(arguments, 1);

            $elem.find('.sub-' + channel).each(function () {

                // if the original target is the same as subscriber
                // then don't trigger it again
                if (this !== e.target) {

                    $(this).trigger(e, extraArgs);

                }

            });

        });

    };


}(window.jQuery));
