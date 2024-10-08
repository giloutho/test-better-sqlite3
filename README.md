## test-better-sqlite3

The goal of this project is to verify the good integration of sqlite-better3 in an Electron application initiated with Electron Forge. Ultimately, this project should enable us to check that the ___application generated___ works on different operating systems: MacOS intel, MacOS M1, Windows and Linux. The use of node-gyp does not always make things obvious.

### Built With

* [Electron](https://www.electronjs.org/)
* [Electron-forge](https://github.com/electron-userland/electron-forge)
* [Better-sqlite3](https://github.com/JoshuaWise/better-sqlite3)


## Installation and usage
 
Clone the repo
```sh
git clone https://github.com/giloutho/test-better-sqlite3
```

### Windows
It is not sure that a simple _"npm intall"_ runs without errors. On the repository of better-sqlite3, here is a [troubleshooting guide](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/troubleshooting.md). After many hours, here is what seems essential :
* install the latest of node
* install latest Visual Studio Community and Desktop Development with C++ extension. Success with 2019 version
* run npm install as __administrator__

### Linux
Tested on Ubuntu. This works directly without problems. _"npm intall"_ and _"npm start"_.

### Mac Intel
Tested on MacOS 10.15 (Catalina). This works directly without problems. _"npm intall"_ and _"npm start"_.

### Mac Arm
Tested on MacOS 12.2 (Monterey). This works directly without problems. _"npm intall"_ and _"npm start"_.

### Versions
These tests were performed with : 
* Electron 17
* Electron-forge 6
* better-sqlite3 7.5

## Results
With sql text files, this test create an in memory database.

Some requests are made : Select, Select count, Insert and Delete.
