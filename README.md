JsonQuery
=========

JsonQuery was inspired by Trent Richardson's implementation. The key differences between this project
and his are that this project provides CRUD methods and uses an Object Oriented paradigm. If you
are looking for a SQL query string based solution, please check out 
[http://trentrichardson.com/jsonsql/](http://trentrichardson.com/jsonsql/) The JsonQuery library
provides SQL like powers but a different method for querying.

Installation
------------

To install the script into your code simply include the jsonsql-0.2.min.js into your project and
create tables using the JsonSQL object.

Initialization
--------------

JsonQuery expects that the data passed into the constructor is an array of JSON objects. You can
use the following methods to insert more data.

	data.insert({name: 'test'});
	data.concat([{name: 'test'}, {name: 'fail'}]);

Querying
--------

The JsonQuery library uses MongoDB like querying syntax. Basically, a JSON Object of conditions is
passed to the where() method. Conditions at the top level are computed using AND and conditions at
the nested level are computed using OR. All query functions must be nested. All fields not using an
inner function are assumed to be using equals.

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

	data.match(name: {$match: /test/i});

Testing
-------

The JsonSQL project uses Jasmine, 
[http://pivotal.github.com/jasmine/](http://pivotal.github.com/jasmine/), to test the code. To run
the tests, open SpecRunner.html. Add more specs by editing spec/JsonQuerySpec.js

Future Stuff
------------

* Updating records
* Indexing
* Sorting
* Grouping