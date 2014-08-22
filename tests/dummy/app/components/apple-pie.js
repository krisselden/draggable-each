import Ember from 'ember';

export default Ember.Component.extend({
  rerender: function() {
    console.log('didRerender');
    this._super();
  }
});
