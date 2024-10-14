const path = require('path')
const fs = require('fs')
const Database = require('better-sqlite3')

let txt = document.getElementById('connect')
let logMsg =''

function importData() {
    let input = document.createElement('input')
    input.type = 'file'
    input.onchange = _ => {
        let files =   Array.from(input.files)
        if (files.length > 0) {
            testFile(files[0])
        }        
    };
    input.click();   
  }

function testFile(fileObj) {
    let dbName = fileObj.name
    let dbFullPath = fileObj.path
    displaySimple('Request : '+dbFullPath)
    try {
        const db = new Database(dbFullPath)
        displayLog('Tables of '+dbName+' :')
        const stmtTables = db.prepare("SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'")
        for (const tableName of stmtTables.iterate()) {
            displayLog(tableName.name)
        }
        db.close()
        displayLog('database closed')
    } catch (err) {
        displayLog('Error : '+err)
    }    
}

function displayLog(msg) {
  logMsg += '<br/>'+msg
  txt.innerHTML = logMsg
}

function displaySimple(msg) {
  logMsg += msg+'<br/>'
  txt.innerHTML = logMsg
}