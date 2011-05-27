describe("JsonSQL", function() {
	var table;
	
	beforeEach(function() {
		table = new JsonSQL();
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
});
