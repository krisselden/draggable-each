import Ember from 'ember';

export default  Ember.Route.extend({
  model: function(){
    return [
      Ember.Object.create({ id:  1, name: "Apple"        }),
      Ember.Object.create({ id:  2, name: "Apricot"      }),
      Ember.Object.create({ id:  3, name: "Avocado"      }),
      Ember.Object.create({ id:  4, name: "Banana"       })
    ];
  }
});

