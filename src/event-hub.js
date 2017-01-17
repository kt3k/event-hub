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
class EventHub {

  __init__ () {
    this.bindEvents()
  }

  /**
   * Gets channels.
   * @return {Array}
   */
  channels () {
    const channels = this.el.getAttribute('channels') || this.el.getAttribute('channel')

    if (!channels) {
      return []
    }

    return channels.replace(/^\s*|\s*$/g, '').split(/\s+/)
  }

  /**
   * Binds events.
   */
  bindEvents () {
    this.channels().forEach(this.bindEventsForChannel, this)
  }

  /**
   * Binds to the given event (channel).
   *
   * The handler publish the event to the subscribers.
   * @private
   * @param {string} channel The channel to listen
   */
  bindEventsForChannel (channel) {
    const el = this.el

    el.addEventListener(channel, function (e) {
      Array.prototype.forEach.call(el.querySelectorAll('.sub-' + channel), function (subscriber) {
        // if the original target is the same as subscriber
        // then don't trigger it again
        if (subscriber !== e.target) {
          subscriber.dispatchEvent(new CustomEvent(e.type, { detail: e.detail }))
        }
      })
    })
  }
}

cc.def('event-hub', EventHub)
