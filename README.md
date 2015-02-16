# Welcome! To Karl - Philippe Cassel's Work.

## For the humans that would like to look at parts of my code, here it all is. 

#### Projects

##### 1. function RUBI() (in Javascript and currently in development)

##### 2. Monster Track (in JavaScript)
<pre>
</pre>
##### 3. Offline game, untitled. (in Java)
<pre>

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
