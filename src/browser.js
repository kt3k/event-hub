import EventHub from './event-hub'

if (typeof self === 'undefined' || self.cc == null) {
  throw new Error('window.cc is not available: event-hub needs classcaps object as window.cc')
}

self.cc.def('event-hub', EventHub)
