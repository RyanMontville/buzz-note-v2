# BuzzNote V2
Version 2.0 of BuzzNote - A bee hive health tracker. A web app for Monte's Own that can be used to track the health of bee hives. The app allows the user to quickly and easily record the data using their phone when the go to inspect the bee hives. The purpose of recording the inspections is to try to find patterns and possibly use the data from last year to predict what will happen this year.

[View Live Demo](https://ryanmontville.com/buzz-note-v2/)

January 2026 Update: [Version 3.0 is now live](https://github.com/RyanMontville/buzz-note-v3).

## Changes
| V1 | V2 |
| -------- | ------- |
| Can only manage one hive | Can manage multiple hives   |
| Assumes the hive has 3 boxes, and that each box has 10 frames | Can set number of boxes and frames in a hive |
| Boxes are numbered 1 - 3 | Can give custom names to hives and boxes |
| When going through a new inspection, the app went through the boxes from 3 to 1 | Can choose which box to complete next |
| Several options when recording an inspection, maing it overly complicated | Most variables are now simply true/false |
| Uses React | Uses Angular |
| Uses a simple PHP API, loads all data into the app every time a change is made | Uses the FatFree framework for its API, only loads updated data |

## New for V2
* Better Error handling
* Can be installed as a Progrssive Web App

You can view BuzzNote V1 [here](https://github.com/RyanMontville/buzz-note-v1)
