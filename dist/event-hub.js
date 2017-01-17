(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * event-hub.js v6.0.0
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 */

/**
 * EventHub is a coelement which forms event-hub class-component.
 *
 * see README for details.
 */
var EventHub = function () {
  function EventHub() {
    _classCallCheck(this, EventHub);
  }

  _createClass(EventHub, [{
    key: '__init__',
    value: function __init__() {
      this.bindEvents();
    }

    /**
     * Gets channels.
     * @return {Array}
     */

  }, {
    key: 'channels',
    value: function channels() {
      var channels = this.el.getAttribute('channels') || this.el.getAttribute('channel');

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
     * @param {string} channel The channel to listen
     */

  }, {
    key: 'bindEventsForChannel',
    value: function bindEventsForChannel(channel) {
      var el = this.el;

      el.addEventListener(channel, function (e) {
        Array.prototype.forEach.call(el.querySelectorAll('.sub-' + channel), function (subscriber) {
          // if the original target is the same as subscriber
          // then don't trigger it again
          if (subscriber !== e.target) {
            subscriber.dispatchEvent(new CustomEvent(e.type, { detail: e.detail }));
          }
        });
      });
    }
  }]);

  return EventHub;
}();

cc.def('event-hub', EventHub);

},{}]},{},[1]);
