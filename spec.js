'use strict';

const $ = global.$ = global.jQuery = require('jquery');
const expect = require('chai').expect

require('class-component');

require('./');


describe('event-hub', function () {

    beforeEach(function () {

        this.$hub = $('<div class="event-hub" channel="foo bar" />').appendTo(document.body);

        this.$kid0 = $('<div class="sub-foo sub-bar" />').appendTo(this.$hub);
        this.$kid1 = $('<div class="sub-foo" />').appendTo(this.$hub);
        this.$kid2 = $('<div class="" />').appendTo(this.$hub);

        this.$kid3 = $('<div class="" />').appendTo(this.$hub);

        $.cc.init();

    });

    afterEach(function () {

        this.$hub.remove();

    });

    it('publishes events of a child to subscribers', function (done) {

        var spy0foo = sinon.spy();
        var spy0bar = sinon.spy();
        var spy1foo = sinon.spy();
        var spy1bar = sinon.spy();
        var spy2foo = sinon.spy();
        var spy2bar = sinon.spy();

        this.$kid0.on('foo', spy0foo);
        this.$kid0.on('bar', spy0bar);
        this.$kid1.on('foo', spy1foo);
        this.$kid1.on('bar', spy1bar);
        this.$kid2.on('foo', spy2foo);
        this.$kid2.on('bar', spy2bar);

        this.$kid3.trigger('foo');
        this.$kid3.trigger('bar');

        setTimeout(function () {

            expect(spy0foo.called).to.be.true;
            expect(spy0bar.called).to.be.true;
            expect(spy1foo.called).to.be.true;
            expect(spy1bar.called).to.be.false;
            expect(spy2foo.called).to.be.false;
            expect(spy2bar.called).to.be.false;

            done();

        }, 30);

    });

    it('publishes events of itself to subscribers', function (done) {

        this.$kid0.on('foo', function () {

            done();

        });

        this.$hub.trigger('foo');

    });

    it('publish events and they do not propagate anymore when published', function (done) {

        var spy = sinon.spy();

        this.$hub.on('foo', spy);

        this.$kid3.trigger('foo');

        setTimeout(function () {

            expect(spy.calledOnce).to.be.true;
            // this means foo events of $hub fired only once
            // which means foo event on $kid0 and $kid1 didn't propagate to the parent(= $hub)

            done();

        }, 30);

    });

});
