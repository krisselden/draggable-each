import Ember from 'ember';

export default Ember.Controller.extend({
  items: [
  ],
  actions: {
    itemWasMoved: function(model, from, to) {
      Ember.Logger.info('itemWasMoved', model, from, '->', to);
    }
  }
});
