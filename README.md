JsonQuery
=========

JsonQuery was inspired by Trent Richardson's implementation. The key differences between this project
and his are that this project provides CRUD methods and uses an Object Oriented paradigm. If you
are looking for a SQL query string based solution, please check out 
[http://trentrichardson.com/jsonsql/](http://trentrichardson.com/jsonsql/) The JsonQuery library
provides SQL like powers but a different method for querying.

Installation
------------

To install the script into your code simply include the jsonQuery-1.1.min.js from bin/ into your 
project and create tables using the JsonQuery object.

Initialization
--------------

JsonQuery expects that the data passed into the constructor is an array of JSON objects. You can
use the `insert()` method to insert more data.

Querying
--------

The JsonQuery library uses MongoDB like querying syntax. Basically, a JSON Object of conditions is
passed to the `where()` method. Conditions at the top level are computed using AND and conditions at
the nested level are computed using OR. All query functions must be nested. All fields not using an
inner function are assumed to be using equals. The `all()` method returns the entire table.

### Functions

**$lt**: <

	data.where({age: {$lt: 30}});

**$lte**: <=

	data.where({age: {$lte: 30}});
		
**$eq**: ==
	
	data.where(age: 30);
	data.where(age: {$eq: 30});

**$ne**: !=

	data.where(age: {$ne: 30});

**$gt**: >

	data.where(age: {$gt: 30});
	
**$gte**: >=

	data.where(age: {$gt: 30});

**$range**: All values within the range. Uses >= min && <= max

	data.where(age: {$range: {min: 20, max: 30}});
	
**$xrange**: An exclusive range. Uses > min && < max

	data.where(age: {$xrange: {min: 20, max: 30}});
	
**$in**: Tests to see if a value is in an Array

	data.where(age: {$in: [10,20,30,40]});

**$nin**: Tests to see if a value is not in an Array

	data.where(age: {$nin: [10,20,30,40]});

**$match**: Tests to see if a string matches a RegExp

	data.where(name: {$match: /test/i});

### Examples

	// SELECT * FROM data WHERE name = 'test' AND age >= 20 AND age <= 30; 
	data.where(name: 'test', age: {$range: {min: 20, max: 30}});
	// SELECT * FROM data WHERE age = 10 OR age = 20 OR age = 30;
	data.where(age: {$in: [10, 20, 30]});
	// SELECT * FROM data WHERE age < 10 OR age > 90;
	data.where(age: {$lt: 10, $gt: 90});
	
Map/Reduce
----------

Map/Reduce works by calling the `mapreduce()` function. The first argument is a map function and
the second argument is a reduce function. You may provide a third option which is a query to perform
before running map reduce. The mapreduce function iterates through the rows and passes each row to
map. It takes the result of map and puts it into an array. Then it passes the array to reduce and
returns the results of reduce. You can see an example below.

	table = new JsonQuery();
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
	var totalAge = table.mapreduce(m, r); // totalAge is 15
	var lowAge = table.mapreduce(m, r, {age: {$lte: 2}}); // lowAge is 3

	
Testing
-------

The JsonSQL project uses Jasmine, 
[https://jasmine.github.io/](https://jasmine.github.io/), to test the code. To run
the tests, open SpecRunner.html. Add more specs by editing spec/jsonQuerySpec.js

Change Log
----------

## Version 1.1

* Added map/reduce functionality
* Merged insert and concat

Future Stuff
------------

* Modify this to work with Backbone in order to filter collections
* Add an index function
