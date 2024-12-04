      define(['N/record', '../SuiteScripts/oauth_1.js', '../SuiteScripts/oauth_2'], function(record) {
        return{
          post: function(requestBody){
          // Convert JSON string to JSON  object
          var requestBody = JSON.parse(requestBody);
          form.clientScriptModulePath = './innerFileRef.name'
          var semanticRef = 'customrecord1'
          log.debug('salesRep', requestBody.salesRep);
          // Load employee record
          var salesRep = record.load({
            type: 'employee',
            id: requestBody.salesRep,
            isDynamic: true
          });
          // 'customworkflow_changed_id' but in line comment
          /* 'customworkflow_changed_id' but multiline 
          var test = 'cseg_slt_order'
          this time */
          var test = 'cseg_slt_order'
          var values = {
            cseg_slt_order: notAnId,
            customrole_controller1: top_level
          }
          return JSON.stringify(salesRep);
          }
        }
      });