# Pathfinder!

This web application illustrates a maze and demonstrates its traversal path from the starting point to the end, if such a path exists.
It uses a recursive depth-first search algorithm to traverse. 

## Tutorial
The maze is designed as a square grid with customizable dimensions, ranging from a minimum size of 2x2 to a maximum size of 10x10. 

Each cell of the maze is customizable:

Colour Indication:
- Red: Closed path (Anything that is outside the grid is also a closed path by default)
- Yellow: Opened path
- Green: Starting point
- Purple: Exit
- Pink: Traversed path

How to change the cells:

- Single Click: Turns the cell into an Opened path if the cell is a closed path
- Double-click (CASE 1): Sets it as the new start point if one doesn't exist already
- Double-click (CASE 2): If there is a starting point, then the click turns it into an exit point
- Double-click (CASE 3): If there is a starting and exit point, then clicking on the a opened cell turns it into a blockade. 

Note: that there can only be one starting and exit point at a time.

## System Requirements
This program requires a computer that's capable of running Javascript and HTML/CSS. At thhe moment, this is only available as a web application. 

To get started, clone the reposititory. (Preferably using VScode)

And then opend the Pathfinder!.html (Preferably using Five Server, a VScode Extention)

Have fun!
