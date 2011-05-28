/*
 * JsonQuery
 * Author: Phips Peter [pspeter333@gmail.com]
 * Version 0.1
/

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
 * Returns all of the data
 * 
 * @this {JsonQuery}
 * @return {object} All of the data
 */
JsonQuery.prototype.all = function() {
	return this.data_;
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
	// Switch on the function
	switch(func) {
		case "$lt":
			return value < condition;
		case "$lte":
			return value <= condition;
		case "$eq":
			return value === condition;
		case "$ne":
			return value != condition;
		case "$gt":
			return value > condition;
		case "$gte":
			return value >= condition;
		case "$in":
			if(condition instanceof Array) {
				return (value in condition);
			}
			return false;
		case "$nin":
			if(condition instanceof Array) {
				return !(value in condition);
			}
			return false;
		case "$match":
			if(value instanceof String && condition instanceof RegExp) {
				return value.match(condition) != null;
			}
			return false;
		default:
			return false;
	}
}
