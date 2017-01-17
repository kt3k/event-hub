'use strict';

/**
 * event-hub.js v6.1.0
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 */

/**
 * EventHub is a coelement which forms event-hub component.
 *
 * see README for details.
 */
var EventHub = function EventHub () {};

EventHub.prototype.__init__ = function __init__ () {
  this.bindEvents();
};

/**
 * Gets channels.
 * @return {Array}
 */
EventHub.prototype.channels = function channels () {
  var channels = this.el.getAttribute('channels') || this.el.getAttribute('channel');

  if (!channels) {
    return []
  }

  return channels.replace(/^\s*|\s*$/g, '').split(/\s+/)
};

/**
 * Binds events.
 */
EventHub.prototype.bindEvents = function bindEvents () {
  this.channels().forEach(this.bindEventsForChannel, this);
};

/**
 * Binds to the given event (channel).
 *
 * The handler publish the event to the subscribers.
 * @private
 * @param {string} channel The channel to listen
 */
EventHub.prototype.bindEventsForChannel = function bindEventsForChannel (channel) {
  var el = this.el;

  el.addEventListener(channel, function (e) {
    [].forEach.call(el.querySelectorAll('.sub-' + channel), function (subscriber) {
      // if the original target is the same as subscriber
      // then don't trigger it again
      if (subscriber !== e.target) {
        subscriber.dispatchEvent(new CustomEvent(e.type, { detail: e.detail }));
      }
    });
  });
};

module.exports = EventHub;

