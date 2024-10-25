/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/log'],
    /**
 * @param{log} log
 */

      // 20231031-141101
      // 20231031-141707
      // 20231102-142147
      // gwr 20231107-221857
      // 20231109-132344
    
      // 20231121-133223
    /**
      * change 1
      */
    (log) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            const a = 2
            workflow.get({ name: 'custbody_aw_second_lvl_approval' })
            // 20230912-223153
       }
      /**
        * change 2
        */

        return {onRequest}
});
