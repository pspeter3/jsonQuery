describe("JsonQuery", function() {
	var table;

	beforeEach(function() {
		table = new JsonQuery([]);
	});

	it("should be defined", function() {
		expect(table).toBeDefined();
	});
	
	it("should have a static set method", function() {
		expect(JsonQuery.set).toBeDefined();
		expect(JsonQuery.set([0])).toEqual({0: true});
		expect(JsonQuery.set(0)).toEqual({});
	});
	
	it("should have a static isEmpty method", function() {
		expect(JsonQuery.isEmpty).toBeDefined();
		expect(JsonQuery.isEmpty({})).toBeTruthy();
		expect(JsonQuery.isEmpty({name:'fail'})).toBeFalsy();
	});
	
	it("should have a static map of queries", function() {
		expect(JsonQuery.queries).toBeDefined();
	});
	
	it("should have an insert method", function() {
		expect(table.insert).toBeDefined();
	});

	it("should have a where method", function() {
		expect(table.where).toBeDefined();
	});

	it("should have an all method", function() {
		expect(table.all).toBeDefined();
	});

	it("should have a private query sanitizer method", function() {
		expect(table.sanitizeQuery_).toBeDefined();
		// Test removing non existant queries
		conditions = {name:{$non: false}};
		table.sanitizeQuery_(conditions);
		expect(conditions).toEqual({name: {}});
		// Test in functionality
		conditions['name'] = {$in: [0, 1, 2]};
		table.sanitizeQuery_(conditions);
		expect(conditions).toEqual({name: {$in: {0: true, 1: true, 2: true}}});
		// Test removing non Arrays for in
		conditions['name'] = {$in: 0};
		table.sanitizeQuery_(conditions);
		expect(conditions).toEqual({name: {}});
		// Test removing non RegExp for match
		conditions['name'] = {$match: 0};
		table.sanitizeQuery_(conditions);
		expect(conditions).toEqual({name: {}});
		// Test removing improper queries for range
		conditions['name'] = {$range: 0};
		table.sanitizeQuery_(conditions);
		expect(conditions).toEqual({name: {}});
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
		table.insert({name:'test'});
		expect(table.all()).toEqual([{name:'test'}]);
		table.insert([{name:'a'},{name:'b'}]);
		expect(table.all()).toEqual([{name:'test'},{name:'a'},{name:'b'}]);
	});

	it("should be able to do a simple query", function() {
		table.insert({name:'test'});
		expect(table.where({name:'test'})).toEqual([{name:'test'}]);
	});

	it("should be able to do a basic AND query", function() {
		table.insert([{name:'test',age: 0},{name:'fail',age: 0},{name:'test',age:1}]);
		expect(table.where({name:'test',age: 1})).toEqual([{name:'test',age:1}])
	});

	it("should be able to do basic condition queries", function() {
		table.insert([{age: 1},{age: 2},{age:4},{age:8}]);
		expect(table.where({age:{$lt:2}})).toEqual([{age:1}]);
		expect(table.where({age:{$lte:2}})).toEqual([{age:1},{age:2}]);
		expect(table.where({age:{$gt:4}})).toEqual([{age:8}]);
		expect(table.where({age:{$gte:4}})).toEqual([{age:4},{age:8}]);
		expect(table.where({age:{$ne:1}})).toEqual([{age:2},{age:4},{age:8}]);
	});

	it("should be able to do $in and $nin queries", function() {
		table.insert([{age: 1},{age: 2},{age:4},{age:8}]);
		expect(table.where({age:{$in:[1,2]}})).toEqual([{age:1},{age:2}]);
		expect(table.where({age:{$nin:[1,2]}})).toEqual([{age:4},{age:8}]);
	});
	
	it("should be able to do $range and $xrange queries", function() {
		table.insert([{age: 1},{age: 2},{age:4},{age:8}]);
		expect(table.where({age:{$range:{min:1,max:2}}})).toEqual([{age:1},{age:2}]);
		expect(table.where({age:{$xrange:{min:1,max:4}}})).toEqual([{age:2}]);
	});
	
	it("should be able to match regular expression", function() {
		table.insert([{name:'test'},{name:'fail'}]);
		expect(table.where({name:{$match:/e/i}})).toEqual([{name:'test'}]);
	});

	it("should be able to do a basic OR query", function() {
		table.insert([{name:'a',age: 3},{name:'b',age:5}]);
		expect(table.where({age:{$lt:4,$gt:4}})).toEqual([{name:'a',age:3},{name:'b',age: 5}]);
	});
	
	it("should have a map/reduce method", function() {
		expect(table.mapreduce).toBeDefined();
	});
	
	it("should be able to do a sum via map/reduce", function() {
		table.insert([{age: 1},{age: 2},{age:4},{age:8}]);
		var m = function(obj) {
			return obj['age'];
		}
		var r = function(arr) {
			var sum = 0;
			var i;
			for(i in arr) {
				sum += arr[i];
			}
			return sum;
		}
		expect(table.mapreduce(m, r)).toEqual(15);
	});
	
	it("should be able to do map/reduce with a query", function() {
		table.insert([{age: 1},{age: 2},{age:4},{age:8}]);
		var m = function(obj) {
			return obj['age'];
		}
		var r = function(arr) {
			var sum = 0;
			var i;
			for(i in arr) {
				sum += arr[i];
			}
			return sum;
		}
		expect(table.mapreduce(m,r,{age:{$lte:2}})).toEqual(3);
	});
});