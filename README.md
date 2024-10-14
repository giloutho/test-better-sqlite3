## test-better-sqlite3

The goal of this project is to verify the good integration of sqlite-better3 in an Electron application initiated with Electron Forge. Ultimately, this project should enable us to check that the ___application generated___ works on different operating systems: MacOS intel, MacOS M1, Windows and Linux. The use of node-gyp does not always make things obvious.

The first version used an in-memory database. We have found that simply testing Sqlite in memory is **not enough**. An Electron project generated with Electron Forge can 
work normally with an in-memory database and not work with a stored database. This second version only tests a database stored on the disk.

More seriously :
* An Electron project generated with Electron Forge may work with an _npm start_ but throw an error with the application generated by an npm _run make_.
* The purpose of the test is to check the generation of applications with different versions of Electron, Electron Forge and Better-Sqlite.

Clone the repo
```sh
git clone https://github.com/giloutho/test-better-sqlite3
```

Install modules and start. When running, click on the button to select a Sqlite database. If If you don't have one, a sample is provided in the ext_resources folder. This sample comes from [sakila-sqlite3](https://github.com/bradleygrant/sakila-sqlite3)

### Built With

* [Electron](https://www.electronjs.org/) Release 17.1.2
* [Electron-forge](https://github.com/electron-userland/electron-forge) Release 6.4.2
* [Better-sqlite3](https://github.com/JoshuaWise/better-sqlite3)   Release 10.0.0

### Windows
It is not sure that a simple _"npm intall"_ runs without errors. On the repository of better-sqlite3, here is a [troubleshooting guide](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/troubleshooting.md). After many hours, here is what seems essential :
* install the latest of node
* install latest Visual Studio Community and Desktop Development with C++ extension. Success with 2019 version
* run npm install as __administrator__

### Linux
Tested on Ubuntu 18. This works directly without problems. _"npm intall"_ and _"npm start"_.

### Mac Intel
Tested on MacOS 10.15 (Catalina). This works directly without problems. _"npm intall"_ and _"npm start"_.

### Mac Arm
Tested on MacOS 14.6.1 (Sonoma). This works directly without problems. _"npm intall"_ and _"npm start"_.
