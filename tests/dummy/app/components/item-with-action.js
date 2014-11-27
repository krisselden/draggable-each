import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    myAction: function(){
      this.sendAction();
    }
  }
});
