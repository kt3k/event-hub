(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * event-hub.js v5.0.0
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 */

/**
 * EventHub is a coelement which forms event-hub class-component.
 *
 * see README for details.
 */

var EventHub = function () {
    function EventHub(elem) {
        _classCallCheck(this, EventHub);

        this.elem = elem;

        this.bindEvents();
    }

    /**
     * Gets channels.
     * @return {Array}
     */


    _createClass(EventHub, [{
        key: 'channels',
        value: function channels() {
            var channels = this.elem.attr('channels') || this.elem.attr('channel');

            if (!channels) {
                return [];
            }

            return channels.replace(/^\s*|\s*$/g, '').split(/\s+/);
        }

        /**
         * Binds events.
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            this.channels().forEach(this.bindEventsForChannel, this);
        }

        /**
         * Binds to the given event (channel).
         *
         * The handler publish the event to the subscribers.
         * @private
         */

    }, {
        key: 'bindEventsForChannel',
        value: function bindEventsForChannel(channel) {
            var elem = this.elem;

            elem.on(channel, function (e) {

                var extraArgs = Array.prototype.slice.call(arguments, 1);

                elem.find('.sub-' + channel).each(function () {
                    // if the original target is the same as subscriber
                    // then don't trigger it again
                    if (this !== e.target) {
                        $(this).triggerHandler(e, extraArgs);
                    }
                });
            });
        }
    }]);

    return EventHub;
}();

$.cc('event-hub', EventHub);

},{}]},{},[1]);
