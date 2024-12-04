/**
 * Project Status Metric UE
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([
  'N/query',
  'N/ui/serverWidget',
],
  (
    query,
    sw,
  ) => {
    /**
     * Defines the function definition that is executed before record is loaded.
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
     * @param {Form} scriptContext.form - Current form
     * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
     * @since 2015.2
     */
    const beforeLoad = (scriptContext) => {
      try {
        addProjectStatusBanner(scriptContext);
      } catch (e) {
        log.error({ title: 'BeforeLoad Error', details: e });
      }
    }

    /**
     * Add Project Status Banner to Project
     * @param {Object} scriptContext  
     */
    const addProjectStatusBanner = (scriptContext) => {
      if (scriptContext.type != scriptContext.UserEventType.VIEW) {
        return;
      }

      const projectStatusVal = scriptContext.newRecord.getValue({ fieldId: 'custentity_crpsm' });
      if (!projectStatusVal) {
        return;
      }

      const messageTitle = scriptContext.newRecord.getText({ fieldId: 'custentity_crpsm' });
      const messageNotes = scriptContext.newRecord.getValue({ fieldId: 'custentity_crpsm_notes' });
      const messageTypeMap = getMessageTypeMap();

      if (![0,1,2,3].includes(messageTypeMap[projectStatusVal])) {
        return;
      }

      scriptContext.form.addPageInitMessage({
        type: messageTypeMap[projectStatusVal],
        title: messageTitle,
        message: `${messageTitle} ${messageNotes.length ? `- ${messageNotes.replace(/\n/g,'<br/>')}` : ''}`,
      });

      scriptContext.form.getField({ id: 'custentity_crpsm' }).updateDisplayType({ displayType: sw.FieldDisplayType.NODISPLAY })
      scriptContext.form.getField({ id: 'custentity_crpsm_notes' }).updateDisplayType({ displayType: sw.FieldDisplayType.NODISPLAY })
    }

    /**
     * Get Status ID/Banner Type Mapping
     * @return {Object} 
     */
    const getMessageTypeMap = () => {
      const bannerMap = {}
      const queryText = `
      select id,
      (case when BUILTIN.DF(custrecord_crpsm_banner_style) = 'GREEN' then 0
      when BUILTIN.DF(custrecord_crpsm_banner_style) = 'RED' then 3
      when BUILTIN.DF(custrecord_crpsm_banner_style) = 'BLUE' then 1
      when BUILTIN.DF(custrecord_crpsm_banner_style) = 'YELLOW' then 2 end) messagetype,
      from customrecord_crpsm
      `;
      query.runSuiteQL({ query: queryText }).asMappedResults().forEach((result) => {
        bannerMap[result.id] = Number(result.messagetype);
      });
      return bannerMap;
    }

    return { beforeLoad }

  });
