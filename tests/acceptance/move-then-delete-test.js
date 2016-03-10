import Ember from 'ember';
import startApp from '../helpers/start-app';
import { arrayEqual } from '../helpers/text-helpers';

var App;

module('Acceptance: MoveThenDelete', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('drag then delete', function() {
  visit('/add-remove-replace');

  var component;
  andThen(function() {
    equal(currentPath(), 'add-remove-replace');
    equal(find('.draggable-item').length, 2, 'start with 2 items');
    arrayEqual('.draggable-item-handle', [ 'Tony', 'Bruce' ], 'initial order');
    var $listElem = find('.ember-drag-list');
    component = Ember.View.views[$listElem.attr('id')];
    equal(component.get('childViews.length'), 2);
    ok(!component.get('childViews.firstObject')._morph.start, 'initial first view morph start');
    ok(!!component.get('childViews.firstObject')._morph.end, 'initial first view morph end');
    ok(!!component.get('childViews.lastObject')._morph.start, 'initial second view morph start');
    ok(!component.get('childViews.lastObject')._morph.end, 'initial second view morph end');
  });
  andThen(function() {
    Ember.run(function () {
      $('.draggable-item:first').simulateDragSortable({ move: 1, handle: '.draggable-item-handle' });
    });
  });
  andThen(function(){
    arrayEqual('.draggable-item-handle', [ 'Bruce', 'Tony' ], 'post-drag order');
    equal(component.get('childViews.length'), 2);
    ok(!component.get('childViews.firstObject')._morph.start, 'post-drag first view morph start');
    ok(!!component.get('childViews.firstObject')._morph.end, 'post-drag first view morph end');
    ok(!!component.get('childViews.lastObject')._morph.start, 'post-drag second view morph start');
    ok(!component.get('childViews.lastObject')._morph.end, 'post-drag second view morph end');
  });
  click('.draggable-item:eq(1) .remove');
  andThen(function(){
    equal(component.get('childViews.length'), 1);
    equal(component.get('childViews.firstObject.content.name'), 'Bruce');
    ok(!component.get('childViews.firstObject')._morph.start, 'post-delete remaining view morph start');
    ok(!component.get('childViews.firstObject')._morph.end, 'post-delete remaining view morph end');
    arrayEqual('.draggable-item-handle', [ 'Bruce' ], 'post-delete order');
  });
});
