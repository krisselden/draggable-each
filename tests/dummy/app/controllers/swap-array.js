import Ember from 'ember';
var collectionA = ['A','B'];
var collectionB = ['C'];

export default Ember.Controller.extend({
  items: collectionA,
  actions: {
    swapItems : function(){
      if (this.get('items') === collectionA) {
        this.set('items', collectionB);
      } else {
        this.set('items', collectionA);
      }
    },
    itemWasMoved: function(model, from, to) {
      Ember.Logger.info('itemWasMoved', model, from, '->', to);
    }
  }
});
