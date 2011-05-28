describe("JsonQuery", function() {
  var table;
  
  beforeEach(function() {
    table = new JsonQuery([]);
  });
  
  it("should be defined", function() {
    expect(table).toBeDefined();
  });
  
  it("should have an index method", function() {
    expect(table.index).toBeDefined();
  });
  
  it("should have an insert method", function() {
    expect(table.insert).toBeDefined();
  });
  
  it("should have an concat method", function() {
    expect(table.concat).toBeDefined();
  })
  
  it("should have an update method", function() {
    expect(table.update).toBeDefined();
  });
  
  it("should have a where method", function() {
    expect(table.where).toBeDefined();
  });
  
  it("should have an all method", function() {
    expect(table.all).toBeDefined();
  });
  
  it("should have a private query optimizer method", function() {
    expect(table.optimize_query).toBeDefined();
  })
  it("should have a private check method", function() {
    expect(table.check_).toBeDefined();
  });
  
  it("should have a private test method", function() {
    expect(table.test_).toBeDefined();
  });
  
  it("should have a private or method", function() {
    expect(table.or_).toBeDefined();
  });
  
  it("should have a private handle method", function() {
    expect(table.handle_).toBeDefined();
  });
  
  it("should be able to insert documents", function() {
    table.insert({'name': 'test'});
    expect(table.all()).toEqual([{"name": "test"}]);
  });
  
  it("should be able to do a simple query", function() {
    table.insert({'name': 'test'});
    expect(table.where({'name':'test'})).toEqual([{'name': 'test'}]);
  });
  
  it("should be able to do a basic AND query", function() {
    table.concat([{'name': 'test', 'age': 0}, {'name': 'fail', 'age': 0},
      {'name': 'test', 'age': 1}]);
    expect(table.where({'name':'test', 'age': 1})).toEqual(
      [{'name':'test', 'age': 1}])
  });
  
  it("should be able to do basic condition queries", function() {
    table.concat([{'age': 1},{'age': 2},{'age':4},{'age':8}]);
    expect(table.where({'age':{'$lt':2}})).toEqual([{'age':1}]);
    expect(table.where({'age':{'$lte':2}})).toEqual(
      [{'age':1},{'age':2}]);
    expect(table.where({'age':{'$gt':4}})).toEqual([{'age':8}]);
    expect(table.where({'age':{'$gte':4}})).toEqual(
      [{'age':4},{'age':8}]);
    expect(table.where({'age':{'$ne':1}})).toEqual(
      [{'age':2},{'age':4},{'age':8}]);
  });
  
  it("should be able to do $in and $nin queries", function() {
    table.concat([{'age': 1},{'age': 2},{'age':4},{'age':8}]);
    expect(table.where({'age':{'$in':[1,2]}})).toEqual(
      [{'age':1},{'age':2}]);
    expect(table.where({'age':{'$nin':[1,2]}})).toEqual(
      [{'age':4},{'age':8}]);
  });
  
  it("should be able to do a basic OR query", function() {
    table.concat([{'name': 'a', 'age': 3}, {'name': 'b', 'age': 5}]);
    expect(table.where({'name':{'$lt':4,'$gt':'4'}})).toEqual(
      [{'name': 'a', 'age': 3}, {'name': 'b', 'age': 5}]);
  });
});
