describe("Application View", function() {
  var testView;
  var fixture;
  beforeEach(function() {
    testView = new AppView();
  });

  it("should spawn the app and the translation view be defined", function() {
    expect(testView).toBeDefined();
    expect(Docs.length).toEqual(2);
  });
  
  describe("application CRUD", function() {
    
    beforeEach(function() {
    
    });
    
    it("should add a translation", function() { 
    
    });
    
    it("should remove a translation", function() { 
    
    });
  });  
});

describe("Translation Model", function() {
  var transModel;
  
  beforeEach(function() {
    transModel = new Translation();
  });
  
  it("should create a new translation model", function() {
    expect(transModel).toBeDefined();
  });
  
  it("should have defaults set up", function() {
    expect(transModel.get("title")).toEqual('new trans');
    expect(transModel.get("tid")).toEqual('translation');
    expect(transModel.get("saved")).toBe(true);
  });
  
  it("setUnsaved should set saved to false", function() {
    transModel.urlRoot = '/translations';
    transModel.setUnsaved();
    expect(transModel.get("saved")).toBe(false);
  });
  
  it("setSaved should set saved to true", function() {
    transModel.urlRoot = '/translations';
    transModel.setSaved();
    expect(transModel.get("saved")).toBe(true);
  });
  
});

describe("Translation View", function() {
  var transView;
  
  beforeEach(function() {
    transModel = new Translation();
    transView = new TranslationView({model: transModel});
  });
  
  it('should be defined', function(){
    expect(transView).toBeDefined();  
  });
  
  it("should spawn a div of class translation", function() {
    console.log("transView",transView.render());
    expect(transView.render().el.firstElementChild.className).toEqual('cnt-translation'); 
    expect(transView.render().el.firstElementChild.tagName).toEqual('DIV'); 
  });
  
  it("should be in the right collection", function() {
  
  });
  
  describe("translation events", function() {
    it("should change correctly the language", function() { });
    it("should save correctly", function() { });
    it("should change correctly the language", function() { });
    it("should handle correctly the master translation", function() { });
    it("should handle correctly some slave translations", function() { });
    it("should add word in the other panels while writing", function() { });
  });
});
