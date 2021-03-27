#!/bin/bash
#Using bash script to run osascript because applescript do not print to stdout
x=$2
while(($x != "0" ))
do
  osascript $1
  if [ "$x" -gt "0" ]
  then
    ((x-=1))
  fi
  sleep $3
done
