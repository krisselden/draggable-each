import Ember from 'ember';

export default Ember.Controller.extend({
  lists: [1,2],
  otherList: [],
  actions: {
    itemWasMoved: function(model, from, to) {
      Ember.Logger.info('itemWasMoved', model, from, '->', to);
    }
  }
});
