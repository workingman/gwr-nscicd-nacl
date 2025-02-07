            /**
 * @NApiVersion 2.x
 * @NScriptType restlet
 */
define(['N/query'], function(query) {
    return { 
        get: function(context) {
            // Construct the SuiteQL query string
            var suiteQL =
"SELECT  "+
"  \"TRANSACTION\".tranid AS tranidRAW /*{tranid#RAW}*/,  "+
"  \"TRANSACTION\".trandate AS trandateRAW /*{trandate#RAW}*/,  "+
"  \"TRANSACTION\".postingperiod AS postingperiodDISPLAY /*{postingperiod#DISPLAY}*/,  "+
"  BUILTIN.DF(\"TRANSACTION\".postingperiod) AS postingperiodDISPLAY /*{postingperiod#DISPLAY}*/,  "+
"  BUILTIN.DF(\"TRANSACTION\".status) AS statusDISPLAY /*{status#DISPLAY}*/,  "+
"  BUILTIN.DF(transactionLine.item) AS transactionlinesitemDISPLAY /*{transactionlines.item#DISPLAY}*/,  "+
"  BUILTIN.DF(\"TRANSACTION\".entity) AS entityDISPLAY /*{entity#DISPLAY}*/,  "+
"  transactionLine.quantity * -1 AS transactionlinesquantity /*- {‌transactionlines.quantity}*/,  "+
"  BUILTIN.CONSOLIDATE(transactionLine.netamount, 'LEDGER', 'DEFAULT', 'DEFAULT', 1, 396, 'DEFAULT') AS transactionlinesnetamountCU /*{transactionlines.netamount#CURRENCY_CONSOLIDATED}*/,  "+
"  BUILTIN.CURRENCY(BUILTIN.CONSOLIDATE(transactionLine.netamount, 'LEDGER', 'DEFAULT', 'DEFAULT', 1, 396, 'DEFAULT')) AS transactionlinesnetamountCU_C /*{transactionlines.netamount#CURRENCY_CONSOLIDATED}*/,  "+
"  CUSTOMRECORD41.custrecord14 AS custrecord15customrecord41c /*{custrecord15<customrecord41.custrecord14#RAW}*/ "+
"FROM  "+
"  \"TRANSACTION\",  "+
"  CUSTOMRECORD41,  "+
"  \"ACCOUNT\",  "+
"  TransactionAccountingLine,  "+
"  transactionLine "+
"WHERE  "+
"  ((((\"TRANSACTION\".\"ID\" = CUSTOMRECORD41.custrecord15 AND TransactionAccountingLine.\"ACCOUNT\" = \"ACCOUNT\".\"ID\"(+)) AND (transactionLine.\"TRANSACTION\" = TransactionAccountingLine.\"TRANSACTION\" AND transactionLine.\"ID\" = TransactionAccountingLine.transactionline)) AND \"TRANSACTION\".\"ID\" = transactionLine.\"TRANSACTION\")) "+
"   AND ((UPPER(\"TRANSACTION\".\"TYPE\") IN ('SALESORD') AND UPPER(\"TRANSACTION\".status) IN ('SALESORD:D', 'SALESORD:E', 'SALESORD:B') AND UPPER(\"ACCOUNT\".accttype) IN ('INCOME') AND (NOT( "+
"    transactionLine.itemtype IN ('ShipItem') "+
"  ) OR transactionLine.itemtype IS NULL) AND ((transactionLine.quantity * -1) - NVL(transactionLine.quantitycommitted, 0)) - NVL(transactionLine.quantityshiprecv, 0) > 0 AND NVL(transactionLine.mainline, 'F') = 'F' AND NVL(transactionLine.taxline, 'F') = 'F' AND NVL(transactionLine.isclosed, 'F') = 'F')) "+
"ORDER BY  "+
"  \"TRANSACTION\".trandate ASC NULLS LAST";

            // Run the SuiteQL query
            var resultSuiteQL = query.runSuiteQL(suiteQL);

            // Compose the RESTlet response
            var response = {
                resultSuiteQL: resultSuiteQL
            };

            // Return the response
            return JSON.stringify(response);
        }
    }
}); 

          