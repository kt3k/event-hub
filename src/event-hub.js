/**
 * event-hub.js v5.0.1
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 */

const $ = jQuery

/**
 * EventHub is a coelement which forms event-hub class-component.
 *
 * see README for details.
 */
class EventHub {

  constructor (elem) {
    this.elem = elem

    this.bindEvents()
  }

    /**
     * Gets channels.
     * @return {Array}
     */
  channels () {
    const channels = this.elem.attr('channels') || this.elem.attr('channel')

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
     */
  bindEventsForChannel (channel) {
    const elem = this.elem

    elem.on(channel, function (e) {
      elem.find('.sub-' + channel).each(function () {
                // if the original target is the same as subscriber
                // then don't trigger it again
        if (this !== e.target) {
          this.dispatchEvent(new CustomEvent(e.type, { detail: e.detail }))
        }
      })
    })
  }
}

$.cc('event-hub', EventHub)
