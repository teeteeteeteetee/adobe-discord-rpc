#!/bin/bash
n=$1
while [ 0 != $n ]
do
   xprop -id $(xprop -root 32x '\t$0' _NET_ACTIVE_WINDOW | cut -f 2) WM_CLASS WM_NAME
   sleep $2
   if [ "$n" -gt "0" ]
   then
   		n=`expr $n - 1`
   fi
done
