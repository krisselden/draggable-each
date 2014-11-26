import Ember from 'ember';

export default Ember.Controller.extend({
  leftItems: [
      Ember.Object.create({ id:  1, name: "Apple"        }),
  ],
  rightItems: [
      Ember.Object.create({ id:  2, name: "Banana"       }),
  ],
  actions: {
    itemWasMoved: function(model, from, to) {
      Ember.Logger.info('itemWasMoved', model, from, '->', to);
    }
  }
});
