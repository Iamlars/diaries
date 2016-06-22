// 因为采用了部分ES2015语法，nodejs 需要6.0以上版本方可运行

let Mock  = require('mockjs');
let Random = Mock.Random;

/*
let faker = require('faker');

faker.locale = "zh_CN";

console.log(faker.address.city());          
console.log(faker.address.zipCode());
console.log(faker.address.streetName());
console.log(faker.address.latitude());
console.log(faker.company.companyName());
console.log(faker.date.month());
console.log(faker.date.past());
console.log(faker.internet.avatar());
console.log(faker.internet.email());
console.log(faker.phone.phoneNumber());
console.log(faker.random.locale());

*/
  
  
  
module.exports = function() {
  var data = { 
      news: []
  };
  
  var images = [1,2,3].map(x=>Random.image('200x100', Random.color(), Random.word(2,6)));
  
  for (var i = 0; i < 10; i++) {
      
    var content = Random.cparagraph(0,10);
    
    data.news.push({
         id: i, 
         title: Random.cword(8,20),
         desc: content.substr(0,40),
         tag: Random.cword(2,6),
         views: Random.integer(100,5000),
         images: images.slice(0,Random.integer(1,3))
    })
  }

  return data
}