import Ember from 'ember';
import startApp from '../helpers/start-app';
import { arrayEqual } from '../helpers/text-helpers';

var App;

module('Acceptance: DragBetweenLists', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('drag from one list to another', function() {
  visit('/two-lists');

  var leftComponent;
  var rightComponent;
  andThen(function() {
    equal(currentPath(), 'two-lists');
    equal(find('.left-list .draggable-item').length, 1, 'start with 1 item on the left');
    equal(find('.right-list .draggable-item').length, 1, 'start with 1 item on the right');
    var $leftListElem = find('.left-list');
    var $rightListElem = find('.right-list');
    leftComponent = Ember.View.views[$leftListElem.attr('id')];
    rightComponent = Ember.View.views[$rightListElem.attr('id')];
    equal(leftComponent.get('childViews.length'), 1);
    equal(rightComponent.get('childViews.length'), 1);
    ok(!leftComponent.get('childViews.firstObject')._morph.start, 'initial first view morph start');
    ok(!leftComponent.get('childViews.firstObject')._morph.end, 'initial first view morph end');
    ok(!rightComponent.get('childViews.firstObject')._morph.start, 'initial first view morph start');
    ok(!rightComponent.get('childViews.firstObject')._morph.end, 'initial first view morph end');
  });
  andThen(function() {
    Ember.run(function () {
      $('.left-list .draggable-item:first').simulateDragSortable({ move: 1, dropOn: '.right-list', handle: '.draggable-item-handle', tolerance: 150 });
    });
  });
  andThen(function(){
    return new Ember.RSVP.Promise(function(resolve){
      stop();
      setTimeout(resolve, 3000);
    }).then(function(){
      start();
      equal(leftComponent.get('childViews.length'), 0);
      equal(rightComponent.get('childViews.length'), 2);
      equal(find('.left-list .draggable-item').length, 0, 'after drag, 0 items on the left');
      equal(find('.right-list .draggable-item').length, 2, 'after drag, 2 items on the right');
      ok(!rightComponent.get('childViews.firstObject')._morph.start, 'after drag first view morph start');
      ok(!!rightComponent.get('childViews.firstObject')._morph.end, 'after drag first view morph end');
      ok(!!rightComponent.get('childViews.lastObject')._morph.start, 'after drag last view morph start');
      ok(!rightComponent.get('childViews.lastObject')._morph.end, 'after drag last view morph end');
    });
  });
});
