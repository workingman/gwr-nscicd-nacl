/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/log'],

    (log) => {
        const onRequest = (scriptContext) => {
            const a = 2
            workflow.get({ name: 'custbody_aw_second_lvl_approval' })
            workflow.get({ name: 'custbody_srd_translated_field' })
            workflow.get({ name: 'custbody_srd_opp_source' })

       }

        return {onRequest}
});