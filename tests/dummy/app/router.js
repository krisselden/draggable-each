import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
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
