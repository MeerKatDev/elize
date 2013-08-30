/** Language collection */
var LanguageScheme = new Backbone.Collection([
    {code: "en-gb", value: 'British English'},
    {code: "en-us", value: 'USA English'},
    {code: "it-it", value: 'Italian'},
    {code: "de-de", value: 'German'},
    {code: "pl-pl", value: 'Polish'}
]);

/**
 * Translation Collection
 * - Collection of all translations in a document
 */
var Translations = Backbone.Collection.extend({
    model: Translation,

    initialize: function(){
        this.populate();
    },

    localStorage: new Backbone.LocalStorage("Phonetica-elements"),

    populate: function(){
        var i = this.initialTranslations;
        while(i--){
            this.create({ id:i });
        }
    }
});
var Trans = new Translations();


/**
 * Document Collection
 * - Collection of all documents
 */
var Documents = Backbone.Collection.extend({
    model: Document,
    initialTranslations: 2,

    initialize: function(){  },

    localStorage: new Backbone.LocalStorage("Phonetica-docs")
});
var Docs = new Documents;