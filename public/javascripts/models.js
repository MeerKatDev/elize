
/**
 * Translation Model
 * -- Model for a single Translation
 */
var Translation = Backbone.Model.extend({

    defaults: {
        id: 0,
        language: 'en-gb',
        text: 'empty translation',
        doc_id: 0
    }
});

/**
 * Document Model
 * -- Model for a Document, a group of translations
 */
var Document = Backbone.Model.extend({

    defaults: {
        id: 0,
        title: 'new doc',
        translation_ids: [],
        saved: true
    },

    setUnsaved: function() {
        this.save({saved: false});
    },

    setSaved: function() {
        this.save({saved: true});
    }
});