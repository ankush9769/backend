//syllabus=>
//fundamentals of javascript
//array and object
//fuction return
//async js coding
//alert("hello this is  a alert");


//you can put almost all things in arr of js
var arr = [1,2,3,"hello",{name:"ankush"},function(){},[54,67,45]]
//you must know following these things
//forEach,map,filter,find,indexof

//forEach   = it is basically use for accessing and  manipulating each element of an array

var arr1=[1,2,3,4]
arr1.forEach(function(val){
    console.log(val+" hello");
})


//map =  it is basically use for creating a new array from an existing array with some modification of value
var newarr = arr1.map((val)=>{
    return val+10;
})
console.log(newarr)  //newarr is new created arr


//filter = it basically retrun those element who satisfy the specific condition
//filter does not work with the val of fuction it work on the True and False value if the True then element will be  in the new array if false then it will be in the old array
var newarr1 = arr1.filter((val)=>{
    return val>=3;
});
console.log(newarr1);


//find = it used for finding any specific value from the arr 
var newarr2 = arr1.find((val)=>{
    return val===3;
});
console.log(newarr2);


//indexof() = it  is used for finding the index of the specific value from the array
var newarr3 = arr1.indexOf(3);
console.log("index of 3 = "+ newarr3);







//object = so basicaly it is key value paire 
{}  // this can also call as object but null object
var obj = {  name:"ankush",
            lastname:"pal",
            age:19
};
console.log("name = "+obj.name);
console.log("lastname = "+obj.lastname);
console.log("age = "+obj.age);

//if you dont allow user to change the value of the object just simply use freeze
Object.freeze(obj);
obj.age=25  // it will not change the age of the obj
console.log(obj.age);





//function
//we can also know the lenght of the function
function hello(a,b,c,d){
    return "thank you";  // returning thank you
};
console.log("lenght of hello(a,b,c,d) = "+hello.length); // it will return 4 because it have 4 parameter

var fun = hello(); //calling funtion
console.log(fun);






//await = it is not alsways write with async funtion but when it is nessesry then write withing asynce
async function abcd() {
    var data = await fetch(`https://randomuser.me/api/`)//this is website that give random user data
    var user = await data.json();
    console.log(user);
}
abcd();
console.log("hello this statement might be display before the  user data");












