import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'dummy-item-controller',
  numMoves: 0,
  actions: {
    itemWasMoved: function(){
      var numMoves = this.incrementProperty('numMoves');
      this.forEach(function(itemController){
        itemController.set('status', 'moved x' + numMoves);
      });
    },
    remove: function(item){
      this.get('content').removeObject(item);
    }
  }
});
