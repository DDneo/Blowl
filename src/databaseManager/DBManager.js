
function connect() {

var db = window.sqlitePlugin.openDatabase({ name: 'mydb', location: 'localhost' }, function (error) {
    console.log('Open database ERROR: ' + JSON.stringify(error));
});
return db;
};

function close(db) {
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
}

function createQuery(query, conditions) {
    var results;
    db.transaction(function (tx) {

        tx.executeSql(query, conditions, function(tx, res) {
          results = res.rows;
        },
        function(tx, error) {
            console.log('error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
    });

    return results;
}
