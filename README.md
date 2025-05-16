# Bee Hive Health Tracker V2
Version 2.0 of the bee hive health tracker
[WIP link](https://ryanmontville.com/bees-v2/)

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
