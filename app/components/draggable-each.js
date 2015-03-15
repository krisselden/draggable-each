import Ember from 'ember';
var useMorphStrategy = parseFloat(Ember.VERSION) >= 1.8;

var a_slice = Array.prototype.slice;

// after a jQuery-based re-order, the component's `_childViews` will be correct
// but its morphs will be out of sync. This function corrects the morphs by updating
// them to match the `_childViews` order.
function syncChildMorphs(collectionView) {
  var childViews = collectionView._childViews;
  var morph = collectionView._childViewsMorph;
  morph.morphs = [];

  var i, l;
  for (i=0, l=childViews.length; i<l; i++) {
    var childViewMorph = childViews[i]._morph;
    morph.morphs.push(childViewMorph);
    if (i === 0) {
      childViewMorph.before = null;
      childViewMorph.start = morph.start;
    } else {
      childViewMorph.before = childViews[i-1]._morph;
      childViewMorph.start = childViews[i-1].get('element');
    }

    if (i === l-1) {
      childViewMorph.end = morph.end;
      childViewMorph.after = null;
    } else {
      childViewMorph.end = childViews[i+1].get('element');
      childViewMorph.after = childViews[i+1]._morph;
    }
  }
}

function index(element, selector) {
  return element.parent().children(selector).index(element);
}

function applySortable(el, target, method, itemSelector, handleSelector, connectWith, axis) {
  if (el) {
    var options = {
      start: function(e, ui) {
        ui.item.data('dragon-drop-old-index', index(ui.item, itemSelector));
        ui.item.__source__ = target;
      },

      update: function(e, ui) {
        var newIndex = index(ui.item, itemSelector);
        var oldIndex = ui.item.data('dragon-drop-old-index');
        var source = ui.item.__source__;
        if (ui.item.closest('.ember-drag-list').attr('id') === target.get('elementId')) {
          Ember.run(function() {
            target[method](oldIndex, newIndex, source);
          });
        }
      }
    };

    options.connectWith = connectWith || false;

    if (axis)           { options.axis   = axis;           }
    if (itemSelector)   { options.item   = itemSelector;   }
    if (handleSelector) { options.handle = handleSelector; }

    el.sortable(options);
  }
}

function destroySortable(element) {
  if (element) {
    element.sortable('destroy');
  }
}

var get = Ember.get;

export default Ember.CollectionView.extend(Ember.TargetActionSupport, {
  isVirtual: false,
  classNames: ['ember-drag-list'],
  content: Ember.computed('context', function(){ // can't use Ember.computed.oneWay as of Ember 1.7.0. Not sure why yet. Example VI breaks.
    return this.get('context');
  }),
  handleSelector: ".draggable-item-handle",
  itemSelector: '.draggable-item',
  target: Ember.computed.oneWay('controller'),

  init: function() {
    var itemView = this.get('itemView');
    var ItemViewClass;

    this._updateDisabled = 0;

    if (itemView) {
      ItemViewClass = this.container.lookupFactory('view:' + itemView);
    } else {
      ItemViewClass = this.get('itemViewClass');
    }

    this.set('itemViewClass', ItemViewClass.extend({
      isVirtual: false,
      context: Ember.computed.oneWay('content'),
      template: this.get('template'),
      classNames: ['draggable-item']
    }));

    this._super.apply(this, arguments);
  },

  didInsertElement: function () {
    Ember.View.views[this.get('elementId')] = this;
    applySortable(this.$(),
                  this,
                  'itemWasDragged',
                  this.get('itemSelector'),
                  this.get('handleSelector'),
                  this.get('connectWith'),
                  this.get('axis'));
  },

  willDestroyElement: function () {
    delete Ember.View.views[this.get('elementId')];
    destroySortable(this.$());
  },
  // lifted from Ember.Compontent
  sendAction: function(action) {
    var actionName;
    var contexts = a_slice.call(arguments, 1);

    // Send the default action
    if (action === undefined) {
      actionName = get(this, 'action');
    } else {
      actionName = get(this, action);
    }

    // If no action name for that action could be found, just abort.
    if (actionName === undefined) { return; }

    this.triggerAction({
      action: actionName,
      actionContext: contexts
    });
  },

  viewReceived: function(view, source) {
    view.set('parentView', this);
    view.set('_parentView', this);
    var contextView = this._contextView || this._parentView;

    var parentKeywords = contextView._keywords;
    Ember.set(view._keywords, 'view', parentKeywords.view);
    Ember.set(view._keywords, 'controller', parentKeywords.controller);
    Ember.set(view._keywords, '_view', this);
  },

  arrayWillChange: function() {
    if (this.isDestroyed || this.isDestroying) { return; }
    if (this._updateDisabled > 0) { return; }
    this._super.apply(this, arguments);
  },

  arrayDidChange: function() {
    if (this.isDestroyed || this.isDestroying) { return; }
    if (this._updateDisabled > 0) { return; }
    this._super.apply(this, arguments);
  },

  execWithoutRerender: function (func, context) {
    this._updateDisabled++;

    try {
      return func.call(context);
    } finally {
      this._updateDisabled--;
    }
  },
  itemWasDragged: function (oldIndex, newIndex, source) {
    var sourceList = source.get('content');
    var targetList = this.get('content');

    var object = sourceList.objectAt(oldIndex);
    var entry = object.isController ? object.get('content') : object;
    var view = source._childViews.splice(oldIndex, 1)[0];

    this.execWithoutRerender(function(){
      source.execWithoutRerender(function() {
        if (source !== this) {
          this.viewReceived(view, source);
        }
        this._childViews.splice(newIndex, 0,  view);

        sourceList.removeAt(oldIndex);
        targetList.insertAt(newIndex, entry);
        view.set('content', targetList.objectAt(newIndex)); // needed when using item controllers that will get destroyed subsequent to the removeAt operation

        if (useMorphStrategy) {
          syncChildMorphs(source);
          if (source !== this) { syncChildMorphs(this); }
        }

        Ember.propertyDidChange(source, 'childViews');
        Ember.propertyDidChange(this, 'childViews');
      }, this);
    }, this);
    this.sendAction('itemWasMoved', entry, oldIndex, newIndex, sourceList);
  }
});
