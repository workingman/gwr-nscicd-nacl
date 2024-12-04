/**
 * Project Status Metric
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([
  'N/search',
],
  /**
   * @param{search} search
   */
  (
    search
  ) => {

    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    const pageInit = (scriptContext) => {

      const statusVal = scriptContext.currentRecord.getValue({ fieldId: 'custentity_crpsm' });
      if (statusVal) {
        document.querySelector("div[data-walkthrough='Field:custentity_crpsm']").style.backgroundColor = search.lookupFields({
          type: 'customrecord_crpsm',
          id: statusVal,
          columns: 'custrecord_crpsm_color'
        })
          .custrecord_crpsm_color[0].text;
      }
    }

    const fieldChanged = (scriptContext) => {
      if (scriptContext.fieldId = 'custentity_crpsm') {
        const statusVal = scriptContext.currentRecord.getValue({ fieldId: 'custentity_crpsm' });
        if (statusVal) {
          document.querySelector("div[data-walkthrough='Field:custentity_crpsm']").style.backgroundColor = search.lookupFields({
            type: 'customrecord_crpsm',
            id: scriptContext.currentRecord.getValue({ fieldId: 'custentity_crpsm' }),
            columns: 'custrecord_crpsm_color'
          })
            .custrecord_crpsm_color[0].text;
        } else {
          document.querySelector("div[data-walkthrough='Field:custentity_crpsm']").style.backgroundColor = '';
        }

      }
    }

    return {
      pageInit,
      fieldChanged,
    };

  });
