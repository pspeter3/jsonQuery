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
 * @return {Array} The result set for all the records that match the conditions
 */
JsonSQL.prototype.where = function(conditions) {
	
}

/**
 * Inserts an object
 *
 * @this {JsonSQL}
 * @param {object}
 */
JsonSQL.prototype.insert = function(row) {
	this.data_.push(row);
}