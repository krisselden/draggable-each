import Ember from 'ember';

export default Ember.Controller.extend({
  items: [
    Ember.Object.create({ name: 'Tony' }),
    Ember.Object.create({ name: 'Bruce' }),
  ],
  otherList: [],
  actions: {
    add: function(){
      this.get('items').pushObject(Ember.Object.create({ name: 'Clark' }));
    },
    remove: function(item){
      this.get('items').removeObject(item);
    },
    replace: function(){
      this.set('items', [
        Ember.Object.create({ name: 'Barney' }),
        Ember.Object.create({ name: 'Fred' }),
        Ember.Object.create({ name: 'Betsy' }),
        Ember.Object.create({ name: 'Wilma' })
      ]);
    },
    itemWasMoved: function(model, from, to) {
      Ember.Logger.info('itemWasMoved', model, from, '->', to);
    }
  }
});
