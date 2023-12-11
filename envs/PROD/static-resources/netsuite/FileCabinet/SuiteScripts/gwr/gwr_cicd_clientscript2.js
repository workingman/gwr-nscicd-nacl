/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */


define(['N/record', 'N/search'],
/**
 * @param{record} record
 * @param{search} search
 */
// non-conflicting line GR 20231201-100259
       // 20231210-120823
       // 20231210-121100
       // 20231210-122829
       // BIZAPP-105707
       // BIZAPP-105707 post-PR-creation change
function(record, search) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
        alert("Bonjour tout la monde")

    }

    return {
        pageInit: pageInit,
    };
    // 20231130-175636
    
});
