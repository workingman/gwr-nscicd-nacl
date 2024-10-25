/**
* @NApiVersion 2.x
* @NScriptType ScheduledScript
*/

// This script creates multiple sales records and logs the record creation progress.
define(['N/runtime', 'N/record'], function(runtime, record) {
    return {
        execute: function(context) {
            var script = runtime.getCurrentScript();
            for (x = 0; x < 500; x++) {
                var rec = record.create({
                    type: record.Type.SALES_ORDER
                });
                script.percentComplete = (x * 100)/500;
                log.debug({
                    title: 'New Sales Orders', 
                    details: 'Record creation progress: ' + script.percentComplete + '%'
                });
            }
         }
    };
}); 

          