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