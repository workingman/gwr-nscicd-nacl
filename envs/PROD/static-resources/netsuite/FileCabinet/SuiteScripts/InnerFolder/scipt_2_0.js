/**
	 * @NApiVersion 2.x
	 * @NScriptType Restlet
	 * @NModuleScope SameAccount
	 */
	define(['N/record', './oauth_1.js'], function(record) {
		return{
			post: function(requestBody){
			// Convert JSON string to JSON  object
			var requestBody = JSON.parse(requestBody);
			
			log.debug('salesRep', requestBody.salesRep);
			// Load employee record
			var salesRep = record.load({
				type: 'employee',
				id: requestBody.salesRep,
				isDynamic: true
			});
			return JSON.stringify(salesRep);
			}
		}
	});