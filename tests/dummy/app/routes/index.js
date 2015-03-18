import Ember from 'ember';

export default  Ember.Route.extend({
  setupController: function(controller, model) {
    controller.setProperties(model);
  },
  model: function() {
    var model = [
      Ember.Object.create({ id:  1, name: "Apple"        }),
      Ember.Object.create({ id:  2, name: "Apricot"      }),
      Ember.Object.create({ id:  3, name: "Avocado"      }),
      Ember.Object.create({ id:  4, name: "Banana"       })
    ];

    var model2 = [
      Ember.Object.create({ id:  5, name: "Breadfruit"   }),
      Ember.Object.create({ id:  6, name: "Bilberry"     }),
      Ember.Object.create({ id:  7, name: "Blackberry"   }),
      Ember.Object.create({ id:  8, name: "Blackcurrant" }),
      Ember.Object.create({ id:  9, name: "Blueberry"    }),
      Ember.Object.create({ id: 10, name: "Boysenberry"  }),
    ];
    /*
      Ember.Object.create({ id: 11, name: "Cantaloupe"   }),
      Ember.Object.create({ id: 12, name: "Currant"      }),
      Ember.Object.create({ id: 13, name: "Cherry"       }),
      Ember.Object.create({ id: 14, name: "Cherimoya"    }),
      Ember.Object.create({ id: 15, name: "Cloudberry"   }),
      Ember.Object.create({ id: 16, name: "Coconut"      }),
      Ember.Object.create({ id: 17, name: "Cranberry"    }),
      Ember.Object.create({ id: 18, name: "Cucumber"     }),
      Ember.Object.create({ id: 19, name: "Damson"       }),
      Ember.Object.create({ id: 20, name: "Dragonfruit"  }),
      Ember.Object.create({ id: 21, name: "Durian"       }),
      Ember.Object.create({ id: 22, name: "Eggplant"     }),
      Ember.Object.create({ id: 23, name: "Elderberry"   }),
      Ember.Object.create({ id: 24, name: "Feijoa"       }),
      Ember.Object.create({ id: 25, name: "Fig"          }),
      Ember.Object.create({ id: 26, name: "Goji berry"   }),
      Ember.Object.create({ id: 27, name: "Gooseberry"   }),
      Ember.Object.create({ id: 28, name: "Grape"        })
    ];
    */

    // similate some stuff
    setTimeout(function () {
      model.pushObject({
        id: 5,
        name: 'orange'
      });

      model.removeAt(2);
    }, 1000);

    return {
      lists: [{
        id: 1,
        list: model
      }, {
        id: 2,
        list: model2
      }],
      otherList: []
    };
  }
});
