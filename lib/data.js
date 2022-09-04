const fs = require('fs')
const path = require('path');


const lib = {}

lib.baseDir = path.join(__dirname,'../.data')





lib.create = (dir,file,data,callback) => {
    fs.open(`${lib.baseDir}/${dir}/${file}.json`,'wx',(err,filediscriptor) => {
        if(!err && filediscriptor){
            const dbUser = JSON.stringify(data)
            fs.writeFile(filediscriptor,dbUser,(err) => {
                if(!err){
                    fs.close(filediscriptor,(err)=>{
                        if(!err){
                            callback(false)
                        } else {
                            callback(true)
                        }
                    })
                } else {
                    callback(true)
                }
            })
        } else {
            callback(true)
        }
    })
}

lib.read = (dir,file,callback) => {
    fs.readFile(`${lib.baseDir}/${dir}/${file}.json`,'utf8',(err,data) => {
        callback(err,data)
    })
}

lib.readDir = (dir,callback) => {
    fs.readdir(`${lib.baseDir}/${dir}`,(err,data)=>{
        callback(err,data)
    })
}

lib.update = (dir,file,data,callback) => {
    fs.open(`${lib.baseDir}/${dir}/${file}.json`,'r+',(err,filediscriptor)=>{
        if(!err && filediscriptor){
            const updatedDoc = JSON.stringify(data)
            fs.ftruncate(filediscriptor,(err)=>{
                if(!err){
                    fs.writeFile(filediscriptor,updatedDoc,(err)=>{
                        if(!err){
                            fs.close(filediscriptor,(err)=>{
                                if(!err){
                                    callback(false)
                                } else {
                                    callback(true)
                                }
                            })
                        } else {
                            callback(true)
                        }
                    })
                } else {
                    callback(true)
                }
            }) 
        } else {
            callback(true)
        }
    })
}


lib.remove = (dir,file,callback) => {
    fs.unlink(`${lib.baseDir}/${dir}/${file}.json`,(err)=>{
        if(err){
            callback(true)
        } else {
            callback(false)
        }
    })
}



module.exports = lib