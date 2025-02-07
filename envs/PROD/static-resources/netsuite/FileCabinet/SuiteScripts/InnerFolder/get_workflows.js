/**
 * @NApiVersion 2.1
 * @NScriptType restlet
 */
define(["N/record"], (record) => {
  const getRecordFields = (rec) => {
    const { id, sublists = [], type, fields, filter } = rec;

    const recObj = record.load({ type, id });

    if (filter != null) {
      const filterValue = recObj.getValue({ fieldId: filter.fieldId });
      if (!filter.in.includes(filterValue)) {
        return undefined;
      }
    }

    const allFields = new Set(recObj.getFields());
    const fieldsToIterate = fields.filter(f => allFields.has(f));

    const body = Object.fromEntries(
      fieldsToIterate.map(fieldId => [fieldId, recObj.getValue({ fieldId })])
    );
  
    if (sublists.length === 0) {
      return { body };
    }

    const sublistsResult = [];

    for (let sublist of sublists) {
      for (let i = 0; i < recObj.getLineCount({ sublistId: sublist.sublistId }); i++) {
        const sublistRecId = recObj.getSublistValue({
          sublistId: sublist.sublistId,
          line: i,
          fieldId: sublist.idAlias,
        });
        const isDynamicType = recObj.getSublistValue({
          sublistId: sublist.sublistId,
          line: i,
          fieldId: sublist.type,
        });
        const type = !!isDynamicType ? `${isDynamicType.toLowerCase()}${sublist.typeSuffix}` : sublist.type;
        const inner = getRecordFields({ ...sublist, id: sublistRecId, type });
        if (inner != null) {
          sublistsResult.push(inner);
        }
      }
    }

    return { body, sublists: sublistsResult };
  };

  return {
    post: ({ ids, schema }) => JSON.stringify(ids.map(id => getRecordFields({ ...schema, id }))),
  };
});
