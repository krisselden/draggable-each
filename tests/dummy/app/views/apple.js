import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['inner-list-item'],
  didInsertElement: function() {
    console.log('apple#didInsertElement');
    this._super();
  }
});
