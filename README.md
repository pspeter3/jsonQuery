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

Querying
--------

The JsonQuery library uses MongoDB like querying syntax. Basically, a JSON Object of conditions is
passed to the where() method. Conditions at the top level are computed using AND and conditions at
the nested level are computed using OR. All query functions must be nested.

### Functions

* **$lt**: <

	data.where({age:{$lt: 30}});

* **$lte**: <=
* **$eq**: ==
* **$ne**: !=
* 

Testing
-------

The JsonSQL project uses Jasmine, 
[http://pivotal.github.com/jasmine/](http://pivotal.github.com/jasmine/), to test the code. To run
the tests, open SpecRunner.html. Add more specs by editing spec/JsonQuerySpec.js