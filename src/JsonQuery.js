/*
 * JsonQuery
 * Author: Phips Peter [pspeter333@gmail.com]
 * Version 0.1
 */

/**
 * Static map of functions used by JsonQuery
 */
JsonQuery.queries = {
	"$lt": function(val, expect) {return val < expect;},
	"$lte": function(val, expect) {return val <= expect;},
	"$eq": function(val, expect) {return val === expect;},
	"$ne": function(val, expect) {return val != expect;},
	"$gt": function(val, expect) {return val > expect;},
	"$gte": function(val, expect) {return val >= expect;},
	"$range": function(val, expect) {return (val >= expect.min && val <= expect.max);},
	"$xrange": function(val, expect) {return (val > expect.min && val < expect.max);},
	"$in": function(val, expect) {return (val in expect);},
	"$nin": function(val, expect) {return !(val in expect);},
	"$match": function(val, expect) {
		if(typeof(val) === "string") {
			return val.match(expect) != null;
		}
		return false;
	}
}
/**
 * Creates an instance of JsonQuery which represents a table
 * 
 * @constructor
 * @this {JsonQuery}
 * @param {json} data The data to be used by the object. Expects an array of JSON Objects
 */
function JsonQuery(data) {
	/** @private */ this.data_ = data;
}

/**
 * Searches for all records given the hash of conditions
 *
 * @this {JsonQuery}
 * @param {object} conditions A hash of conditions
 * @return {array} The result set for all the records that match the conditions
 */
JsonQuery.prototype.where = function(conditions) {
	var resultSet = [];
	this.sanitizeQuery_(conditions);
	for(row in this.data_) {
		if(this.check_(row, conditions)) {
			resultSet.push(this.data_[row]);
		}
	}
	return resultSet;
}

/**
 * Inserts an object into the store
 *
 * @this {JsonQuery}
 * @param {object} data The object to insert
 */
JsonQuery.prototype.insert = function(data) {
	this.data_.push(data);
}

/**
 * Concats an array into the store
 *
 * @this {JsonQuery}
 * @param {object} data The array to concat with the data
 */
JsonQuery.prototype.concat = function(data) {
	this.data_ = this.data_.concat(data);
}

/**
 * Returns all of the data
 * 
 * @this {JsonQuery}
 * @return {object} All of the data
 */
JsonQuery.prototype.all = function() {
	return this.data_;
}

/**
 * Sanitizes a query for before searching
 *
 * @private
 * @this {JsonQuery}
 * @param {object} conditions The hash of conditions to be optimized
 * @return {object} Returns the sanitized conditions
 */
JsonQuery.prototype.sanitizeQuery_ = function(conditions) {
	for(field in conditions) {
		// Check to make sure that it's a function
		if(typeof(conditions[field]) === "object") {
			for(i in conditions[field]) {
				// Delete non-existant functions
				if(typeof(JsonQuery.queries[i]) === "undefined") {
					delete conditions[field][i];
					continue;
				}
				// Check specific behavior
				if(i === "$in" || i === "$nin") {
					// Make sure it's an array
					if(conditions[field][i] instanceof Array) {
						// Convert it to a set
						conditions[field][i] = JsonQuery.set(conditions[field][i]);
					} else {
						delete conditions[field][i];
						continue;
					}
				} else if(i === "$range" || i === "$xrange") {
					// Delete the condition if it doesn't have a min and max
					if(typeof(conditions[field][i].min) === "undefined" || 
						typeof(conditions[field][i]).max === "undefined") {
						delete conditions[field][i];
						continue;
					}
				} else if(i === "$match") {
					if(!(conditions[field][i] instanceof RegExp)) {
						delete conditions[field][i];
						continue;
					}
				}
			}
		}
	}
}

/**
 * Checks to see if an object passes a test
 * 
 * @private
 * @this {JsonQuery}
 * @param {number} index The index of the row to check
 * @param {object} conditions The hash of conditions to check against
 * @return {boolean} Returns whether or not the object passed
 */
JsonQuery.prototype.check_ = function(index, conditions) {
	for(field in conditions) {
		// Perform short circuit AND
		if(!this.test_(index, field, conditions[field])) {
			return false;
		}
	}
	// Return true by default
	return true;
}

/**
 * Evaluates a condition given a row index and a field
 * 
 * @private
 * @this {JsonQuery}
 * @param {number} index The index of the row to check
 * @param {string} field The field to check on
 * @param {object} condition The condition to check
 * @return {boolean} Returns whether or not the test passes
 */
JsonQuery.prototype.test_ = function(index, field, condition) {
	// Check if the field exists
	if(typeof(this.data_[index][field]) !== "undefined") {
		// Check if the condition is an object
		if (typeof(condition) === "object") {
			return this.or_(this.data_[index][field], condition);
		} else {
			return this.data_[index][field] === condition;
		}
	} else {
		return false;
	}
}

/**
 * Does an OR check on a subcondition
 * 
 * @private
 * @this {JsonQuery}
 * @param {object} value The value of the field
 * @param {object} condition The condition to be checked
 * @return {boolean} Returns whether or not the value is true
 */
JsonQuery.prototype.or_ = function(value, condition) {
	for(func in condition) {
		// Perform short circuit OR
		if(this.handle_(value, func, condition[func])) {
			return true;
		}
	}
	// Return false by default
	return false;
}

/**
 * Handles the function call
 * 
 * @private
 * @this {JsonQuery}
 * @param {object} value The value of the field
 * @param {string} func The string to be checked
 * @param {object} condition The condition to be checked
 * @return {boolean} Returns whether or not the value is true
 */
JsonQuery.prototype.handle_ = function(value, func, condition) {
	if(typeof(JsonQuery.queries[func]) !== "undefined") {
		return JsonQuery.queries[func](value, condition);
	}
	// Return false by default
	return false;
}

/**
 * Creates a set from an array and returns a null set if the object is not an array
 * 
 * @param {array} arr The array to be turned into a set
 * @return {object} The set to be used
 */
JsonQuery.set = function(arr) {
	var result = {};
	// Populate the result if the parameter is an Array
	if(arr instanceof Array) {
		for(i in arr) {
			result[arr[i]] = true;
		}
	}
	return result;
}