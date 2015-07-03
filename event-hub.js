/**
 * event-hub.js v2.0.5
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 */


(function ($) {
    'use strict';

    $.CC.register('event-hub', function () {

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

            var extraArgs = Array.prototype.slice.call(arguments, 1);

            $elem.find('.sub-' + channel).each(function () {

                // if the original target is the same as subscriber
                // then don't trigger it again
                if (this !== e.target) {

                    $(this).triggerHandler(e, extraArgs);

                }

            });

        });

    };


}(jQuery));
