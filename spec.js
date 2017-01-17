'use strict'

const $ = require('jquery')
const expect = require('chai').expect

const cc = require('classcaps')

cc.def('event-hub', require('./src/event-hub'))

let $hub, $kid0, $kid1, $kid2, $kid3

describe('event-hub', function () {
  beforeEach(function () {
    $hub = $('<div class="event-hub" channel="foo bar" />').appendTo(document.body)

    $kid0 = $('<div class="sub-foo sub-bar" />').appendTo($hub)
    $kid1 = $('<div class="sub-foo" />').appendTo($hub)
    $kid2 = $('<div class="" />').appendTo($hub)

    $kid3 = $('<div class="" />').appendTo($hub)

    cc.init()
  })

  afterEach(function () {
    $hub.remove()
  })

  it('publishes events of a child to subscribers', function (done) {
    var spy0foo = sinon.spy()
    var spy0bar = sinon.spy()
    var spy1foo = sinon.spy()
    var spy1bar = sinon.spy()
    var spy2foo = sinon.spy()
    var spy2bar = sinon.spy()

    $kid0.on('foo', spy0foo)
    $kid0.on('bar', spy0bar)
    $kid1.on('foo', spy1foo)
    $kid1.on('bar', spy1bar)
    $kid2.on('foo', spy2foo)
    $kid2.on('bar', spy2bar)

    $kid3[0].dispatchEvent(new CustomEvent('foo', { bubbles: true }))
    $kid3[0].dispatchEvent(new CustomEvent('bar', { bubbles: true }))

    setTimeout(function () {
      expect(spy0foo.called).to.be.true
      expect(spy0bar.called).to.be.true
      expect(spy1foo.called).to.be.true
      expect(spy1bar.called).to.be.false
      expect(spy2foo.called).to.be.false
      expect(spy2bar.called).to.be.false

      done()
    }, 30)
  })

  it('publishes events of itself to subscribers', function (done) {
    $kid0.on('foo', function () {
      done()
    })

    $hub[0].dispatchEvent(new CustomEvent('foo', { bubbles: true }))
  })

  it('publish events and they do not propagate anymore when published', function (done) {
    var spy = sinon.spy()

    $hub.on('foo', spy)

    $kid3.trigger('foo')

    setTimeout(function () {
      expect(spy.calledOnce).to.be.true
      // this means foo events of $hub fired only once
      // which means foo event on $kid0 and $kid1 didn't propagate to the parent(= $hub)

      done()
    }, 30)
  })
})
