const path = require('path')
const fs = require('fs')

let txt = document.getElementById('connect')
let logMsg =''

const Database = require('better-sqlite3')
const db = new Database(':memory:')

const sqlCreatePath = path.join(__dirname, '../ext_resources/','sample-create.sql')
const shemaCreation = fs.readFileSync(sqlCreatePath, 'utf8')

try {
    db.exec(shemaCreation)
    console.log('In-memory database  created...')
    displayLog('In-memory database  created...')
    const sqlDataPath = path.join(__dirname, '../ext_resources/','sample-data.sql')
    const shemaData = fs.readFileSync(sqlDataPath, 'utf8')
    db.exec(shemaData)
    displayLog('sample data inserted in database...')
    
    // request testing
    displayLog('*** Test -> SELECT * FROM employees')
    // Compact writing, all is attached to the statement
    const allEmp = db.prepare('SELECT * FROM employees').all()
    allEmp.forEach((row) => {
      displaySimple(row.first_name+' '+row.last_name)
    })

    // Similar to .all(), but instead of returning every row together, an iterator is returned so you can retrieve the rows one by one. 
    // If you plan on retrieving every row anyways, .all() will perform slightly better.
    displayLog('*** Test -> iterator usage')
    const allCount = db.prepare('SELECT * FROM countries')
    for (var row of allCount.iterate()) {
      // id 3 for Asia
      if (row.region_id === 3) {     
        displayLog(row.country_id+' '+row.country_name);
        break;
      }
    }    

    // We wait for a single line, we use get which returns only the first line
    displayLog('*** Test -> result returns only the first line')
    const oneEmpl = db.prepare('SELECT * FROM employees WHERE last_name = \'Khoo\'').get()
    displayLog(oneEmpl.first_name+' '+oneEmpl.last_name+' '+oneEmpl.salary)

    displayLog('*** Test -> displays the number of employees with a salary above 10,000')
    const maxSal = db.prepare('SELECT count(*) as nbmaxsal FROM employees WHERE salary > 10000').get()
     displayLog(maxSal.nbmaxsal)

    displayLog('*** Test -> insert a record and returns last ID')
    const insertjob = db.prepare('INSERT INTO jobs (job_title, min_salary, max_salary) VALUES (?, ?, ?)')
    const result = insertjob.run('Full-stack dev', '11000', '18000')
    displayLog('Row affected : '+result.changes+' last ID : '+result.lastInsertRowid)

    displayLog('*** Test -> delete a record and returns changes parameter')
    const deleteIt = db.prepare('DELETE FROM departments WHERE department_id=6');
    const resDel =  deleteIt.run()
    displayLog(resDel.changes)   
 
    // All changes are saved even if the database is not closed
    db.close()
    displayLog('database closed')
  } catch (err) {
    console.error(err)
  }

function displayLog(msg) {
  logMsg += '<br/><br/>'+msg
  txt.innerHTML = logMsg
}

function displaySimple(msg) {
    logMsg += '<br/>'+msg
    txt.innerHTML = logMsg
  }