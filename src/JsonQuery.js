/*
 * JsonSQL
 * Author: Phips Peter [pspeter333@gmail.com]
 * Version 0.1
/

/**
 * Creates an instance of JsonSQL which represents a table
 * 
 * @constructor
 * @this {JsonSQL}
 * @param {json} data The data to be used by the object. Expects an array of JSON Objects
 */
function JsonSQL(data) {
	/** @private */ this.data_ = data;
}

/**
 * Searches for all records given the hash of conditions
 *
 * @this {JsonSQL}
 * @param {object} A hash of conditions
 * @return {array} The result set for all the records that match the conditions
 */
JsonSQL.prototype.where = function(conditions) {
	
}

/**
 * Inserts an object into the store
 *
 * @this {JsonSQL}
 * @param {object} The object to insert
 */
JsonSQL.prototype.insert = function(row) {
	this.data_.push(row);
}

/**
 * Checks an object to see if it passes
 * 
 * @this {JsonSQL}
 * @param {object} The object to check
 * @param {object} The hash of conditions to check against
 * @return {boolean} Returns whether or not the object passed
 */
JsonSQL.prototype.pass_ = function(row, conditions) {
	// Cycle through the fields to be checked
	for(field in conditions) {
		// Check to see if the is a value or an object
		
	}
	// Return true if gets here
	return true;
}