import Ember from 'ember';

export default Ember.Controller.extend({
  items: ['A','B'],
  otherItems: [],
  actions: {
    itemWasMoved: function(model, from, to) {
      Ember.Logger.info('itemWasMoved', model, from, '->', to);
    }
  }
});
