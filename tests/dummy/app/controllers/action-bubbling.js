import Ember from 'ember';

export default Ember.Controller.extend({
  items: [
    Ember.Object.create({ id:  1, name: "Apple"        }),
  ],
  megaStatus: false,
  actions: {
    megaAction: function(){
      this.toggleProperty('megaStatus');
    },
    itemWasMoved: function(model, from, to) {
      Ember.Logger.info('itemWasMoved', model, from, '->', to);
    }
  }
});
