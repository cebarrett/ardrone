#!/bin/bash
nmap -sT -p23 192.168.0.0/24 | grep -B5 "23/tcp open  telnet" | grep "^Nmap scan report for" | grep -v "\.1$" | awk '{print $5}'

