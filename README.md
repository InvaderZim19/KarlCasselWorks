# Welcome! To Karl - Philippe Cassel's Work.

## For the humans that would like to look at parts of my code, here it is. 

#### Projects

##### 1. function RUBI() (in Javascript and currently in development)

##### 2. Monster Track (in JavaScript)
<pre>
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
</pre>
##### 3. Offline game, untitled. (in Java)
<pre>

import java.util.*;
import static java.lang.System.*;
import java.util.ArrayList;

class Room
{
	public ArrayList<String> description;
	public String roomName;
	public ArrayList<String> choiceList;
	public ArrayList<String> roomList; // rooms that are the result of the choices
	public Room next;
	public Room previous;
	public UserChoice user = new UserChoice();
	
	public Room(String rN, ArrayList<String> desc, ArrayList<String> choices,
		ArrayList<String> rooms) 
	{
		roomName = rN;
		description = desc;
		choiceList = choices;
		roomList = rooms;
	}
	public Room() 
	{
		roomName = null;
		description = new ArrayList<String>();
		choiceList = new ArrayList<String>();
		roomList = new ArrayList<String>();
	}
	public void clearRoom()
	{
		ArrayList<String> cL = new ArrayList<String>();
		ArrayList<String> rL = new ArrayList<String>();
		ArrayList<String> desc = new ArrayList<String>();
		this.roomName = null;
		this.choiceList = cL;
		this.roomList = rL;
		this.description = desc;
	}
}
class LinkedRoomList
{
	public Room first;
	public Room last;
	public Room current;
	public LinkedRoomList()
	{
		first = null;
		last = null;
		current = first;
	}
	public boolean isEmpty() 
	{
		return first == null;
	}

	public void insertLast(Room rT)
	{
		Room newRoom = new Room(rT.roomName, rT.description, rT.choiceList, rT.roomList);
		current = first;
		if(isEmpty()) 
		{
			first = newRoom;
		}
		else
		{
			last.next = newRoom;
			newRoom.previous = last;
		}
		last = newRoom;
	}

   	public void restart()
   	{
   		// will delete last until the first element is left.
   		if(adventureSize() == 1)
   		{
   			// do nothing
   			System.out.println("Cannot restart, it's only the beginning.");
   		}
   		else
   		{
   			current = first;
   		}

   	}

   	public void undo() 
   	{
   		if(!(isEmpty()) && current != first)
   		{
   			current = current.previous;
   		}
   		else if(current == first)
   		{
   			System.out.println("Cannot undo the beginning.");
   		}
   		else 
   		{
   			// do nothing
   		}
   	}

   	public void showInfo()
   	{
   		Room temp = first;

   		System.out.println("All rooms:");
   		for(int i = 1;temp != null; i++)
   		{
   			System.out.println(temp.roomName + " -> " + temp.choiceList.toString());
   			temp = temp.next;
   		}
   		System.out.println();
   	}

   	private ArrayList<Character> loadAlphabet(ArrayList<Character> z)
	{
		for(char alphabet = 'a'; alphabet <= 'z';alphabet++) 
		{
    		z.add(alphabet);
		}
		return z;
	}
   	// assumes first has a room
   	public void showRoom() 
   	{
   		String j;
   		char roomChar;
		System.out.println(current.roomName);
		for(int z = 0; z < current.description.size(); z++)
		{
			System.out.println(current.description.get(z));
		}
		System.out.println();
   		ArrayList<Character> alpha = new ArrayList<Character>();
		loadAlphabet(alpha);
		while(true)
		{
			for(int i = 0; i < current.choiceList.size(); i++)
			{
				System.out.println(alpha.get(i) + " - " + current.choiceList.get(i));
			}
			System.out.println();
			break;
		}

		j = current.user.readInput();
		if(j.equals("r")){
			restart();
		} else if(j.equals("y")){
			showInfo();
		} else if(j.equals("z")){
			undo();
		} else if(j.equals("a")||j.equals("b")||j.equals("c")||j.equals("d")||j.equals("e")||
		         j.equals("f")||j.equals("g")||j.equals("h")||j.equals("i")||j.equals("j")||
				 j.equals("k")||j.equals("l")){
			current.user.create(j);
			roomChar = j.charAt(0);
			int roomNumber = alpha.indexOf(roomChar);
			if(roomNumber >= 0)
			{
				if(findRoom(current.roomList.get(roomNumber)) == null)
				{
					System.out.println("Not valid input. Please try again.");
				} 
				else
				{
					current = findRoom(current.roomList.get(roomNumber));
				}
				
			}
			else
			{
				System.out.println("Not valid input. Please try again.");
			}
		} else{
		    System.out.println("Not valid input. Please try again.");
		}
   	}

   	private int adventureSize()
   	{
   		int i = 0;
   		Room temp = first;
   		while(temp != null)
   		{
   			i++;
   			temp = temp.next;
   		}
   		return i;
   	}

   	private Room findRoom(String rN)
   	{
   		Room temp = first;
   		while(temp != null)
   		{
   			if(temp.roomName.equals(rN))
   			{
   				return temp;
   			}
   			else
   			{
   				temp = temp.next;
   			}
   		}
   		return temp;
   	}
}
</pre>

UserChoice.java
<pre>
import java.util.Scanner;
import java.util.*;
import static java.lang.System.*;

class Link{

  public String input;
  public Link first;
  public Link next;

	public Link(String j) {
		 input = j;
	}
}

class UserChoice{

	private Link first;
	private int counter;
	 
	public UserChoice() {
		first = null;
		counter = 0;
	}
	 

	public String readInput() {
	 	Scanner h = new Scanner (System.in);
		String j = h.next();
		if(j.equals("r")){
			restart();
		} else if(j.equals("q")){
		    System.exit(0);
			//exits program when user types in 'q'
	    } else if(j.equals("y")){
	    	// goes into room.java
		} else if(j.equals("z")){
		    //go back one Link in room.java
		} else if(j.equals("a")||j.equals("b")||j.equals("c")||j.equals("d")||j.equals("e")||
		         j.equals("f")||j.equals("g")||j.equals("h")||j.equals("i")||j.equals("j")||
				 j.equals("k")||j.equals("l")){
			create(j);
		} else{
		    // print error, in room.java
		}
			return j;
	}
		
	public void restart(){
		while(counter != 0){
			Link temp = first;
			first = first.next;
			counter--;
		}
			if(counter == 0){
			System.out.println("You are at the beginning.");
			}
	}

	public void create(String j) {   //*
	     Link newLink = new Link(j);
		 newLink.next = first;
		 first = newLink;
		 counter++;
	}
 }
</pre>

GameFile.adventure
<pre>
r The street
d You see an old lady who is carrying eight shopping bags and trying to cross the street
o help the lady out
t helping the lady
o ignore the lady
t ignore

r helping the lady
d You help the lady cross the street. In thanks she gives you a bundle of oranges
o eat oranges
t food poisoning
o take the oranges
t school
o throw the oranges away
t lady hits you

r ignore
d You ignore the helpless old woman and she gives you the stink eye. You see a hotdog stand.
o go to hot dog stand
t hot dog stand
o walk past hot dog stand
t The street

r food poisoning
d You get food poisoning from the oranges.
o go to hospital
t hospital

r hospital
d At the hospital you are given medicine.
d But after you take the medicine you get an allergic reaction. Oh what a horrible day! 
o Perhaps tomorrow will be better.
t The street

r school
d You go to school.
d Your friends see you have oranges and ask for them.
o give them oranges
t class
o eat the oranges in front of them
t food poisoning

r class
d You are in class now
d You get a text from your friends.
d They all got food poisoning!
d You got a C (70%) on the midterm you got back, but at least you don't have food poisoning!
o Perhaps tomorrow will be a great day too! 
t The street

r lady hits you
d The lady hits you with her 50 pound bag.
d "YOU THANKLESS SCAMP!" she croaks.
d You start to bleed.
o go home
t home
o hospital
t hospital
o ignore it
t walking

r walking
d You faint and someone calls the ambulance for you.
d You hope the bill won't be high, but it probably will be.
o Perhaps tomorrow will be a better day.
t The street

r home
d You bandage your head and go to sleep.
d You wake up in a pool of blood.
o Maybe tomorrow will be a better day.
t The street

r hot dog stand
d You are hungry.
o buy a hot dog
t bought hot dog
o ignore hotdog stand and continue walking
t The street

r bought hot dog
d The hot dog looks good.
d You are about to take a bite when a guy with a baby carriage mows you down and steas your hot dog. 
d Your knee starts to bleed.
o go home
t home

</pre>

Makefile
<pre>
JAVASRC    = Game.java UserChoice.java Room.java
SOURCES    = ${JAVASRC} Makefile
ALLSOURCES = ${SOURCES}
MAINCLASS  = Game
CLASSES    = ${patsubst %.java, %.class, ${JAVASRC}}

all: ${CLASSES}

%.class: %.java
	javac -Xlint $<

clean:
	rm -f *.class

test: all
	java Game demo.adventure

.PHONY: clean all test

</pre>
