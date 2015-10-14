/**
 * Hack UCSC 2015!
 * Team: Don't Byte Me!
 * App: Monster Track
 * Summary: An fitness app that trains you
 * Programmed by Sarah Borland & Karl Cassel
 * Art by Maria Zdorova, Yuna Choe & Aubrey Issacman
 */
var Accel = require('ui/accel');
var UI = require('ui');
var Vector2 = require('vector2');
var steps = 0;
var monsterSteps =-50;
var death =false;
var Vibe = require('ui/vibe');

var rankCheck = [
  {
    check:0,
    rank:'Rank F: Monster Meat'
  },
  {
   check:5,
    rank:'Rank D: First to Fall'
  },
  {
   check:7,
   rank:'Rank C: Last Survivor' 
  },
  {
    check:8,
    rank:'Rank B: The King'
  },
  {
    check:9,
    rank:'Rank A: The Overlord'
  },
  {
    check:10,
    rank:'Rank S: The Conquerer'
  },
];

var runnerSprite = [
  {
   position: new Vector2(-10,50),
   size: new Vector2(80,35),
  image: 'images/runner1.png' 
  },
  {
   position: new Vector2(-10,50),
   size: new Vector2(80,35),
  image: 'images/runner2.png' 
  },
];

var main = new UI.Card({
  title: 'Monster Track',
  icon: 'images/logo.png',
  body:  'Up for Zombie        Middle for Werewolf  Bottom for Vampire        Brought to you by Team Dont Byte Me'
});

main.show();


main.on('click', 'up', function(e) {    
//Initalize local variables
  Accel.init();
  var didStep = false;
  var monsterStepsDisplay = 10;
  var monTimer = setInterval(function () {monster()}, 2000);

  var runWind = new UI.Window();
  
  var topRect = new UI.Rect({
    position: new Vector2(10,5),
    size: new Vector2(124,30),
    backgroundColor:'black'
    });
  var botRect = new UI.Rect({
    position: new Vector2(10,110),
    size: new Vector2(124,30),
    backgroundColor:'black'
    });
  var bgRect = new UI.Rect({
    position: new Vector2(0,0),
    size: new Vector2(144,168),
    backgroundColor:'white'
    });
  var stepsDisplay = new UI.Text({
    position: new Vector2(10,5),
    size: new Vector2(124,20),
    text: 'START RUNNING!',
    color: 'white',
    textAlign: 'center'
    });
    
    runWind.add(bgRect);
  
  ////////////////Sprite Images on Screen////////////////// 
   var zombiepic = new UI.Image({
    position: new Vector2(50,50),
   size: new Vector2(80,35),
  image: 'images/zombie1.png' 
    }); 
   var runnerpic = new UI.Image({
  position: new Vector2(-10,50),
   size: new Vector2(80,35),
  image: 'images/runner1.png' 
  }); 
  runWind.add(runnerpic); 
    runWind.add(zombiepic); 
  
  
    runWind.add(botRect);
    runWind.add(topRect);
    runWind.add(stepsDisplay);

///////////////////Human Step Counter/////////////
  Accel.on('tap', function(e) {
    if (death === true){
   // runWind.add(deathP);
    } else {
    if (e.direction > 0){
      didStep = true;
      }else{
      didStep = true;
    }
    var runnerpic = new UI.Image({
    position: runnerSprite[1].position,
    size: runnerSprite[1].size,
    image: runnerSprite[(steps%2)].image,
    }); 
    runWind.add(runnerpic);  

    //Step counter display settings
     var topRect = new UI.Rect({
    position: new Vector2(10,5),
    size: new Vector2(124,30),
    backgroundColor:'black'
    });
    runWind.add(topRect);
  
    var stepsDisplay = new UI.Text({
      position: new Vector2(10,5),
      size: new Vector2(124,20),
      text: 'you ran '+(steps+1)+' steps!',
      color: 'white',
      textAlign: 'center'
      }); 
   
    //removes old step display and replaces it with new display
    if (didStep === true){ 
      runWind.remove(stepsDisplay);
      steps += 1;
      runWind.add(stepsDisplay);
      didStep = false;  
    }
  }
});
  
/////////////////Monster Step Counter//////////////////////
 function monster(){
  //updates monster stats
  var monsterSpeed = Math.floor(Math.random() * (8-1) + 1);
  monsterSteps = monsterSteps+monsterSpeed; //i.e -500+1=-499
  monsterStepsDisplay = steps-monsterSteps; //i.e 0-(-499)=499   
   
  //updates monster display 
  runWind.remove(botRect);
  runWind.add(botRect);
    var monsterDisplay = new UI.Text({
      position: new Vector2(10,110),
      size: new Vector2(124,20),
      font: 'gothic-14',
      text: 'evil zombie is '+monsterStepsDisplay+' steps away!',
      color: 'white',
      textAlign: 'center'
      }); 
    runWind.remove(monsterDisplay);
    runWind.add(monsterDisplay);
   
   if(monsterStepsDisplay<10){
     Vibe.vibrate('short');
   } 
   
   //Death 
    if (monsterStepsDisplay <= 0){
      death = true;
      clearInterval(monTimer);
      deathscreen();
    }

   
 }  
 runWind.show();

//function when you get caught
 function deathscreen(){
   var rankStr;
   for (var i =0; i <= 5; i++){
     if (steps>=rankCheck[i].check){
       rankStr = rankCheck[i].rank;
     }
   }
   var deathCard = new UI.Card({
     title:'Ran '+steps+' steps!',
      banner: 'images/Zdeathscreen.png',
     body:rankStr,
   });
   runWind.hide();
   steps = 0;
    monsterSteps =-50;
    death =false;
   deathCard.show();
 }

});



/////////WereWolf/////////
main.on('click', 'select', function(e) {
  Accel.init();
  var didStep = false;
  var monsterStepsDisplay = 10;
  var monTimer = setInterval(function () {monster()}, 2000);

  var runWind = new UI.Window();
  
  var topRect = new UI.Rect({
    position: new Vector2(10,5),
    size: new Vector2(124,30),
    backgroundColor:'black'
    });
  var botRect = new UI.Rect({
    position: new Vector2(10,110),
    size: new Vector2(124,30),
    backgroundColor:'black'
    });
  var bgRect = new UI.Rect({
    position: new Vector2(0,0),
    size: new Vector2(144,168),
    backgroundColor:'white'
    });
  var stepsDisplay = new UI.Text({
    position: new Vector2(10,5),
    size: new Vector2(124,20),
    text: 'START RUNNING!',
    color: 'white',
    textAlign: 'center'
    });
    
    runWind.add(bgRect);
  
  ////////////////Sprite Images on Screen////////////////// 
   var werewolfpic = new UI.Image({ ///CHANGE
    position: new Vector2(50,50),
   size: new Vector2(80,35),
  image: 'images/were1.png' 
    }); 
   var runnerpic = new UI.Image({
  position: new Vector2(-10,50),
   size: new Vector2(80,35),
  image: 'images/runner1.png' 
  }); 
  runWind.add(runnerpic); 
    runWind.add(werewolfpic); ///CHANGE
  
  
    runWind.add(botRect);
    runWind.add(topRect);
    runWind.add(stepsDisplay);

///////////////////Human Step Counter/////////////
  Accel.on('tap', function(e) {
    if (death === true){
   // runWind.add(deathP);
    } else {
    if (e.direction > 0){
      didStep = true;
      }else{
      didStep = true;
    }
    var runnerpic = new UI.Image({
    position: runnerSprite[1].position,
    size: runnerSprite[1].size,
    image: runnerSprite[(steps%2)].image,
    }); 
    runWind.add(runnerpic);  

    //Step counter display settings
     var topRect = new UI.Rect({
    position: new Vector2(10,5),
    size: new Vector2(124,30),
    backgroundColor:'black'
    });
    runWind.add(topRect);
  
    var stepsDisplay = new UI.Text({
      position: new Vector2(10,5),
      size: new Vector2(124,20),
      text: 'you ran '+(steps+1)+' steps!',
      color: 'white',
      textAlign: 'center'
      }); 
   
    //removes old step display and replaces it with new display
    if (didStep === true){ 
      runWind.remove(stepsDisplay);
      steps += 1;
      runWind.add(stepsDisplay);
      didStep = false;  
    }
  }
});
  
/////////////////Monster Step Counter//////////////////////
 function monster(){
  //updates monster stats
  var monsterSpeed = Math.floor(Math.random() * (8-1) + 1);
  monsterSteps = monsterSteps+monsterSpeed; //i.e -500+1=-499
  monsterStepsDisplay = steps-monsterSteps; //i.e 0-(-499)=499   
   
  //updates monster display 
  runWind.remove(botRect);
  runWind.add(botRect);
    var monsterDisplay = new UI.Text({
      position: new Vector2(10,110),
      size: new Vector2(124,20),
      font: 'gothic-14',
      text: 'scary werewolf is '+monsterStepsDisplay+' steps away!',
      color: 'white',
      textAlign: 'center'
      }); 
    runWind.remove(monsterDisplay);
    runWind.add(monsterDisplay);
   
   if(monsterStepsDisplay<10){
     Vibe.vibrate('short');
   } 
   
   //Death 
    if (monsterStepsDisplay <= 0){
      death = true;
      clearInterval(monTimer);
      deathscreen();
    } 
 }  
 runWind.show();

//function when you get caught
 function deathscreen(){
   var rankStr;
   for (var i =0; i <= 5; i++){
     if (steps>=rankCheck[i].check){
       rankStr = rankCheck[i].rank;
     }
   }
   //console.log('ranking: '+rankStr);
   var deathCard = new UI.Card({
     title:'Ran '+steps+' steps!',
     body:rankStr,
     banner: 'images/werewolfdead1.png'///CHANGE
   });
   runWind.hide();
   steps = 0;
    monsterSteps =-50;
    death =false;
   deathCard.show();
 }

});

/////////Vampire/////////
main.on('click', 'down', function(e) {
  Accel.init();
  var didStep = false;
  var monsterStepsDisplay = 10;
  var monTimer = setInterval(function () {monster()}, 1000);

  var runWind = new UI.Window();
  
  var topRect = new UI.Rect({
    position: new Vector2(10,5),
    size: new Vector2(124,30),
    backgroundColor:'black'
    });
  var botRect = new UI.Rect({
    position: new Vector2(10,110),
    size: new Vector2(124,30),
    backgroundColor:'black'
    });
  var bgRect = new UI.Rect({
    position: new Vector2(0,0),
    size: new Vector2(144,168),
    backgroundColor:'white'
    });
  var stepsDisplay = new UI.Text({
    position: new Vector2(10,5),
    size: new Vector2(124,20),
    text: 'START RUNNING!',
    color: 'white',
    textAlign: 'center'
    });
    
    runWind.add(bgRect);
  
  ////////////////Sprite Images on Screen////////////////// 
   var vampirepic = new UI.Image({ ///CHANGE
    position: new Vector2(50,60),
    size: new Vector2(100,30),
    image: 'images/vampire1.png' 
    }); 
   var runnerpic = new UI.Image({
  position: new Vector2(-10,50),
   size: new Vector2(80,35),
  image: 'images/runner1.png' 
  }); 
  runWind.add(runnerpic); 
    runWind.add(vampirepic); ///CHANGE
  
  
    runWind.add(botRect);
    runWind.add(topRect);
    runWind.add(stepsDisplay);

///////////////////Human Step Counter/////////////
  Accel.on('tap', function(e) {
    if (death === true){
   // runWind.add(deathP);
    } else {
    if (e.direction > 0){
      didStep = true;
      }else{
      didStep = true;
    }
    var runnerpic = new UI.Image({
    position: runnerSprite[1].position,
    size: runnerSprite[1].size,
    image: runnerSprite[(steps%2)].image,
    }); 
    runWind.add(runnerpic);  

    //Step counter display settings
     var topRect = new UI.Rect({
    position: new Vector2(10,5),
    size: new Vector2(124,30),
    backgroundColor:'black'
    });
    runWind.add(topRect);
  
    var stepsDisplay = new UI.Text({
      position: new Vector2(10,5),
      size: new Vector2(124,20),
      text: 'you ran '+(steps+1)+' steps!',
      color: 'white',
      textAlign: 'center'
      }); 
   
    //removes old step display and replaces it with new display
    if (didStep === true){ 
      runWind.remove(stepsDisplay);
      steps += 1;
      runWind.add(stepsDisplay);
      didStep = false;  
    }
  }
});
  
/////////////////Monster Step Counter//////////////////////
 function monster(){
  //updates monster stats
  var monsterSpeed = Math.floor(Math.random() * (8-1) + 1); // CHANGE
  monsterSteps = monsterSteps+monsterSpeed; //i.e -500+1=-499
  monsterStepsDisplay = steps-monsterSteps; //i.e 0-(-499)=499   
   
  //updates monster display 
  runWind.remove(botRect);
  runWind.add(botRect);
    var monsterDisplay = new UI.Text({
      position: new Vector2(10,110),
      size: new Vector2(124,20),
      font: 'gothic-14',
      text: 'spooky vampire is '+monsterStepsDisplay+' steps away!',
      color: 'white',
      textAlign: 'center'
      }); 
    runWind.remove(monsterDisplay);
    runWind.add(monsterDisplay);
   
  if(monsterStepsDisplay<10){
     Vibe.vibrate('short');
   } 
   
   //Death 
    if (monsterStepsDisplay <= 0){
      death = true;
      clearInterval(monTimer);
      deathscreen();
    } 
 }  
 runWind.show();

//function when you get caught
 function deathscreen(){
   var rankStr;
   for (var i =0; i <= 5; i++){
     if (steps>=rankCheck[i].check){
       rankStr = rankCheck[i].rank;
     }
   }
   var deathCard = new UI.Card({
     title:'Ran '+steps+' steps',
     body:rankStr,
     banner: 'images/vampiredead2.png'
   });
   runWind.hide();
    steps = 0;
    monsterSteps =-50;
    death =false;
   Vibe.vibrate('short');
   deathCard.show();
 }

});
