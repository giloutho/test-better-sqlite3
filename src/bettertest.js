const path = require('path')
var fs = require('fs')

// Delete sample.db if exists
const pathDb = './sample.db'

if (fs.existsSync(pathDb)) {
    try {
        fs.unlinkSync(pathDb)
        console.log('Existing file "sample.db" has been deleted');
    } catch(err) {
    console.error(err)
    }
}


const db = require('better-sqlite3')('sample.db')
const shemaCreation = fs.readFileSync('sample-create.sql', 'utf8')
try {
    db.exec(shemaCreation)
    console.log('sample.db created...')
    const shemaData = fs.readFileSync('sample-data.sql', 'utf8')
    db.exec(shemaData)
    console.log('sample data inserted in database...')
    
    // request testing
    console.log('*** Test -> SELECT * FROM employees')
    // Compact writing, all is attached to the statement
    const allEmp = db.prepare('SELECT * FROM employees').all()
    allEmp.forEach((row) => {
      console.log(row.first_name+' '+row.last_name)
    })

    // Similar to .all(), but instead of returning every row together, an iterator is returned so you can retrieve the rows one by one. 
    // If you plan on retrieving every row anyways, .all() will perform slightly better.
    console.log('*** Test -> iterator usage')
    const allCount = db.prepare('SELECT * FROM countries')
    for (var row of allCount.iterate()) {
      // id 3 for Asia
      if (row.region_id === 3) {     
        console.log(row.country_id+' '+row.country_name);
        break;
      }
    }    

    // We wait for a single line, we use get which returns only the first line
    console.log('*** Test -> result returns only the first line')
    const oneEmpl = db.prepare('SELECT * FROM employees WHERE last_name = \'Khoo\'').get()
    console.log(oneEmpl.first_name+' '+oneEmpl.last_name+' '+oneEmpl.salary)

    console.log('*** Test -> displays the number of employees with a salary above 10,000')
    const maxSal = db.prepare('SELECT count(*) as nbmaxsal FROM employees WHERE salary > 10000').get()
     console.log(maxSal.nbmaxsal)

    console.log('*** Test -> insert a record and returns last ID')
    const insertjob = db.prepare('INSERT INTO jobs (job_title, min_salary, max_salary) VALUES (?, ?, ?)')
    const result = insertjob.run('Full-stack dev', '11000', '18000')
    console.log('Row affected : '+result.changes+' last ID : '+result.lastInsertRowid)

    console.log('*** Test -> delete a record and returns changes parameter')
    const deleteIt = db.prepare('DELETE FROM departments WHERE department_id=6');
    const resDel =  deleteIt.run()
    console.log(resDel)   
 
    // All changes are saved even if the database is not closed
    db.close()
    console.log('database closed')
  } catch (err) {
    console.error(err)
  }