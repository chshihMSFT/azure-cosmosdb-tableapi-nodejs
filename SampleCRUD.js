var azure = require('azure-storage');
console.log("[" + new Date().toISOString() + "] demo start ...");

var accountConnString = "_connection_string_";
var tableName = "_table_name_";

var tableService = azure.createTableService(accountConnString);
var entGen = azure.TableUtilities.entityGenerator;

console.log("[" + new Date().toISOString() + "] insertEntity ...");
for (let i=1 ; i<=10 ; i++){
    var entity = {
        PartitionKey: entGen.String('demo'),
        RowKey: entGen.String(i.toString()),
        description: entGen.String('test description'),
        activityid: entGen.String(uuidv4()),
        create_timestamp: entGen.String(new Date().toISOString()),
    };

    tableService.insertOrReplaceEntity(tableName, entity, function (error, result, response) {
        if (!error) {
            // result contains the ETag for the new entity
        }
    });
    console.log("[" + new Date().toISOString() + "] insertEntity ... " + i );
}
console.log("[" + new Date().toISOString() + "] demo end ...");

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
