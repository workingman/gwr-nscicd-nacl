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
function(record, search) {

    // GR 20240313-123224 20250211-101810
    // GR 241203 

    // GR 20240503-132414

    // GR 20240723-095848

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
        const s = "20240313-122646 20250211-101831"
        alert("Selamat pagi, semua")

    }
    return {
        // non-conflicting change 20250211-101911
        pageInit: pageInit,
    };
});
