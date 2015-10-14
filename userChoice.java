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
