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
	
	it("should have an update method", function() {
		expect(table.update).toBeDefined();
	});
	
	it("should have a delete method", function() {
		expect(table.delete).toBeDefined();
	});
	
	it("should have a where method", function() {
		expect(table.where).toBeDefined();
	});
	
	it("should have an all method", function() {
		expect(table.all).toBeDefined();
	});
	
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
		table.insert({'name': 'test', 'age': 0});
		table.insert({'name': 'fail', 'age': 0});
		table.insert({'name': 'test', 'age': 1});
		expect(table.where({'name':'test', 'age': 1})).toEqual([{'name':'test', 'age': 1}])
	});
});
