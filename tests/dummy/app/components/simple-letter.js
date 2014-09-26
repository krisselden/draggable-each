import Ember from 'ember';

export default Ember.Component.extend({
  verifyElementIsPresent: function() {
    console.log('simple-letter#didInsertElement happened');
    Ember.assert('Expected element to be present', this.get('element'));
  }.on('didInsertElement')
});
