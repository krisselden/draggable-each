import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DummyENV.locationType
});

Router.map(function() {
  this.route('render-helper');
  this.route('using-item-controller');
  this.route('limited-axis');
  this.route('add-remove-replace');
  this.route('swap-array');
  this.route('two-lists');
  this.route('action-bubbling');
});

export default Router;
