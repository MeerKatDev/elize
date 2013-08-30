/**
 * Translation View
 * -- A single language version
 * This is a version of a text, inside a document
 */

var TranslationView = Backbone.View.extend({

    template: _.template($('#translation-template').html()),

    events: {
        'click span.delete-btn': 'remove',
        'click span.save-btn': 'saveText',
        'keydown textarea.translation':'onTextareaKeyDown',
        'change select.lang-sel':'changeLanguage'
    },

    initialize: function(){
        this.listenTo(this.model, 'remove', this.unrender);
    },

    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        console.log('rendered');
        return this;
    },

    unrender: function(){
        console.log('unrendered Trans ');
        $(this.el).remove();
    },

    remove: function(){
        console.log('removed Trans ');
        this.model.save({saved:true});
        this.model.destroy();
    },

    changeLanguage: function(){
        var translation_language = this.$el[0].children[0].children[4].value;
        console.log(translation_language);
        this.model.save({language: translation_language});
    },

    saveText: function(){
        var translation_text = this.$el[0].children[0].lastChild.value;
        this.model.save({text: translation_text});
        this.model.setSaved();
        this.$el[0].children[0].children[3].innerHTML = "Saved";
    },

    unsaveText: function(){
        this.model.setUnsaved();
        this.$el[0].children[0].children[3].innerHTML = "Unsaved";
    },

    onTextareaKeyDown: function(evt) {
        var key = evt.keyCode;
        if(evt.ctrlKey) {
            if (key == 83){
                evt.preventDefault();
                this.saveText();
            }
        }else {
            this.unsaveText();
            if (key == 9) evt.preventDefault(); //tab         
        }
    }

});

var DocumentView = Backbone.View.extend({

    el: $("#document_screen"),

    template: _.template($('#document-template').html()),

    initialize: function () {
        Trans.fetch();
    },

    render: function () {
        console.log("doc rendered");
        this.$el.html(this.template(this.model.toJSON()));
        var tids = this.model.get("translation_ids");
        var i, m, t;
        for (i = 0; i < tids.length; i++) {
            m = Trans.findWhere({id: tids[i]});
            t = new TranslationView({model: m});
            this.$el.append(t.render().$el);
        }
        return this;
    }
});


var DocumentRow = Backbone.View.extend({
    template: _.template($("#doc-row-template").html()),
    events: {
        'click span.open':'loadDocument',
        'click span.delete':'deleteDocument'
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    loadDocument: function(e) {
       var id_model = parseInt(e.target.dataset.id);
    },

    deleteDocument: function(e) {
        var id_model = parseInt(e.target.dataset.id);
    }
});

/**
 * Documents Crud View
 * -- CRUD for documents
 * Set of saved elements in the storage
 */

var DocumentsCrudView = Backbone.View.extend({

    el: $("#latest_documents"),

    initialize: function() {
       this.listenTo(Docs,'all',this.render);
    },

    render: function() {
       this.removeAll();
       this.listAll();
       return this;
    },

    listAll: function() {
       Docs.each(this.listOne, this);
    },

    removeAll: function() {
        this.$el.html('');
    },

    listOne: function(m) {
        var view = new DocumentRow({model: m});
        this.$el.append(view.render().el);
    }
});


/**
 * Program Main View
 * -- The Application
 * This is the top level piece of the app
 */

var AppView = Backbone.View.extend({
    el: $('#application'),

    events: {
        'click li#save_doc': 'saveDocument',
        'click li#add_doc': 'newDocument'
    },

    document: undefined,

    initialize: function(){
        console.log("App initialized");
        new DocumentsCrudView();
        Docs.fetch();
    },

    saveDocument: function() {
        console.log("translation saved");
    },

    newDocument: function() {
        console.log("new translation");
        var id_newdoc = Docs.length+1;
        var doc_model =  new Document({
            id: id_newdoc,
            title: 'translation',
            translation_ids: [Trans.length+1,Trans.length+2]
        });
        Docs.create(doc_model);
        for(var i=0;i<Docs.initialTranslations;i++) {
            Trans.create({
                id: Trans.length+1,
                doc_id: id_newdoc
            });
        }
        this.loadDocument(doc_model);
    },

    loadDocument: function(doc){
        this.document = new DocumentView({model: doc});
        this.$el.append( this.document.render().el );
    }

    /**,
     addTranslation: function(translation){
        console.log('added Trans ');
        translation.set({
            tid: 'translation_' + Docs.length
        });
        var translationView = new TranslationView({ model: translation });
        $(this.el).append(translationView.render().el);
    },
     */

});