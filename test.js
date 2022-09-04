const { create, read, remove, readDir } = require("./lib/data");
const { validateId } = require("./middlewares/users/users.middleware");



const user4 = {
    Id:4,
    name:'maria roby',
    gender:'female',
    contact:'+880179865412',
    address:'malborne,UK',
    photoUrl:'http://maria.png'
}

const updatedDoc = {
    name:'maria',
    gender:'female'
}

function update(updatedDoc,user2) {
    
    return user2
}

// const result =  update(updatedDoc,user2)

// console.log(result);

// create('users',user4.Id,user4,(err)=>{
//     if(err){
//         console.log('server side error');
//     } else {
//         console.log('data save successfull');
//     }
// })

// read('users',user2.Id,(err,data)=>{
//     if(!err && data){
//         console.log(JSON.parse(data));
//     } else {
//         console.log(err);
//     }
// })

// remove('users','user1',(err,data)=>{
//     if(err){
//         console.log('server side error');
//     } else {
//         console.log('delete is successfull');
//     }
// })

// function validate(id,callback){
//     readDir('users',(err,users)=>{
//         const dbUsers = []
//         users.forEach(user => dbUsers.push(user.replace('.json',"")))
//         if(dbUsers.includes(id)){
//             callback(true)
//         } else {
//             callback(false)
//         }
//     })
// }

// validate('6',(res) => {
//     console.log(res);
// })


readDir('users',(err,originalUsers)=>{
    const users = []
    originalUsers.forEach(user => {
        read('users',user.replace('.json',''),(err,data)=>{
            users.push(JSON.parse(data))
            console.log(users);
        })
    })
})