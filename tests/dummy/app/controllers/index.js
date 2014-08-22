import Ember from 'ember';

export default Ember.Controller.extend({
  lists: [1,2],
  otherList: [],
  actions: {
    save: function(model) {
      window.alert('did save: ' + model.name);
    },
    itemWasMoved: function(model, from, to) {
      //Ember.Logger.info('itemWasMoved', model, from, '->', to);
    }
  }
});
