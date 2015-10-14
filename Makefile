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
