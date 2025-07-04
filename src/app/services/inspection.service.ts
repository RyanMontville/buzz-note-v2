import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Inspection } from '../bees.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private _inspections = new BehaviorSubject<Inspection[]>([
    new Inspection(1, 1, '2023-5-12', 'Hive A', 3, 15, '14:51:31', 82, 'Overcast', 'calm', 'low', 'low', 'good', 'none', 'few', false, false, false, true, 'Hive is looking good.\\n4 pounds sugar water was mostly gone, one side of tray was looking filmy, Tracie dumped it.\\nSaw lots of bees with pollen on both legs.\\nAdded 3 pounds sugar water.\\n\\nApp notes:\\nMost frames not yet drawn out, need a none option on comb pattern.\\nDo we want to make fields optional?\\nDo we want to default values to none?\\nSkip option on frame defaults it to none values? Blank values?\\nHow do I delete entries? Accidentally started box 2 but we only have 1 box on.\\neverything should be black and yellow'),
    new Inspection(2, 2, '2023-5-26', 'Hive B', 3, 15, '15:29:03', 67, 'Clear Sky', 'calm', 'low', 'low', 'spotty', 'none', 'few', false, false, false, true, 'No honey in the honey super yet.\\nLarge bee population, bees started getting more and more agitated.\\nAt the start of last box, bee got up into my glove and stung me. The set them off. Soft brush was not getting them off me. Tracie and I got stung on our wrists new Inspection(and my ankles) multiple times.\\nHad to bail on inspection.\\nDid not spit queen or see any eggs.\\nBring stuff brush next time.'),
    new Inspection(3, 1, '2023-5-27', 'Hive A', 3, 15, '14:04:56', 74, 'Clear Sky', 'calm', 'low', 'low', 'spotty', 'none', 'none', false, false, false, true, '3/31/2024 - replaced old Sugar Syrup with new bucket of sugar syrup with Lemongrass and spearmint Essential oils \\nOriginal Sugar Syrup was added 3/15/2024, and it had 1 tsp of sugar syrup left so about 2 weeks supply.\\n\\non 3/15/2024 we removed the quilt box. There was no inner cover because of the quilt box so we had to run and get it from the garage.  The bees had secured the quilt box to the frame so it was a bit of a struggle getting it off. We only had on 1/2 suits and Tracie got stung on the inner thigh. We placed the sugar syrup and closed the box quickly and retreated.  \\n\\nWe fully suited up and retuned. new Inspection(Tracie wiped the sting with vinegar to remove any scent)  We pulled the white bottom board panel to make sure the sugar syrup was not just leaking/pouring out.  We adjusted the Bee Cozy to allow bees to still enter/exit from top and bottom \\n\\n5 cups of water / 2 1/2 pounds sugar 1/8 tsp Lecithin 15 drops Lemongrass 15 drops Spearmint \\n'),
    new Inspection(4, 1, '2023-6-10', 'Hive A', 3, 15, '14:11:15', 78, 'Clear Sky', 'calm', 'low', 'low', 'good', 'none', 'lots', false, false, false, true, 'Removed sugar water shallow box. Carried it out after inspection and then discovered tons of ants between tray and box. Many were carrying white blobs. We are worried they are taking pupae from the bees.\\nAfter visiting, returned to bee yard and spread thick layer of diacatemous earth around base of hive, also sprinkled generously all over bee yard. Hope is to deter ants if they are bothering hive in any way.\\nBees were building comb and honey on tops of frames. Left it, wound up smashing it down when reassembling hive.\\nProtein patty placed 5/27 doesn’t seem to have been chewed much. Leaving it until the next visit, will remove it then.\\nNext visit goals: \\nAdd 2nd box before heading to Guatemala \\nRemove protein patty\\nAdd mite control strip new Inspection(need to buy it)\\nOverall, inspection went well. \\nI could not use the app with gloves on, so we switched to Tracie taking the frames out and holding them up for John to inspect and record in app.\\nSeemed to go by very quickly, almost feel like I want to spend more time out there.'),
    new Inspection(5, 2, '2023-6-20', 'Hive B', 3, 15, '14:49:55', 81, 'Clear Sky', 'calm', 'normal', 'normal', 'good', 'none', 'none', false, false, false, true, 'Placed second box today. Decided not to remove protein patty because bees had eaten half or more since last inspection. Bees seem to want to build up and not out. There was a bunch of comb and honey on top of center frames going up in to the inner cover and hole. We left this as well. Bees seemed very active but were very calm. Spotted queen right away on side 3 new Inspection(frame 2 side A). When we were closing up at end of inspection, we spotted her on side 5 new Inspection(frame 3 side A). Saw eggs, larvae, capped pupae. Placed a ApiGard gel packet on top of box for varroa mite control, couldn’t get exact center over brood because of excess comb and honey. We won’t be able to take any honey from either box because of ApiGard. If we place a 3rd box, we can use that honey. We leave for Guatemala in the morning. After coming back on our last trip in 2019, discovered both hives had swarmed. We are really hoping placing the second box will prevent this.\\nThis was the first inspection where I felt the hive was doing really well, it feels like they have finally overcome their rough start.'),
    new Inspection(6, 1, '2023-7-4', 'Hive A', 3, 15, '12:47:43', 81, 'Clear Sky', 'calm', 'normal', 'normal', 'good', 'none', 'few', false, false, false, true, 'Swapped out apigard, moved to top box\\nBees very active, everything looked great\\nTracie does the work, I do the inspections and logging\\nThis works great\\nAs Tracie lifts frame, we just look for a red dot on our respective side\\nTracie shows me one side for full inspection, rotates frame upside down so that I can see the other side for full inspection\\nI log as she returns frame  and moves to next frame\\n'),
    new Inspection(7, 1, '2023-7-20', 'Hive A', 3, 15, '14:51:37', 85, 'Thunderstorm', 'nervous', 'normal', 'low', 'good', 'none', 'few', false, false, false, true, 'Tracie removed ApiGuard the day before new Inspection(7/19), it was a crispy patty.\\nBees seemed a bit agitated, rain was in the forecast. \\nThe hive seems to be centered, not in the middle, but closer to the left side new Inspection(towards frame 1). \\nBee population was good to high. \\nAfter the inspection, we talked about what we could do to make more room in the hive.  We discussed if we should add a honey super and/or rearrange the frames to make more elbow room.\\nWe have concerns about the ApiGuard and honey. Google search found suggestion to wait 2 weeks before placing supers. We decide to just rearrange frames.\\nOn 7/23 about 4pm, we went out to the bees to rearrange frames. On both boxes, we removed frames 9 and 10, flipped them, slid 1-8 down, and placed 9-10 where 1-2 were. This shifted the brood more into the center of the hive. Box 2 frame 9a was just getting drawn out with wax, all other frames empty.\\nAt start of 7/20 inspection, we noticed lots of ants, some carrying pupae or something new Inspection(hopefully theirs, not the bees) all over the lid. We decided to swap out lids in case they had made a nest under the aluminum. Swap was done on 7/23.\\n\\n'),
    new Inspection(8, 2, '2023-8-5', 'Hive B', 3, 15, '12:27:33', 80, 'Clear Sky', 'nervous', 'crowded', 'normal', 'good', 'none', 'none', false, false, false, false, ''),
    new Inspection(9, 1, '2023-8-28', 'Hive A', 3, 15, '15:54:31', 71, 'Clear Sky', 'angry', 'crowded', 'normal', 'good', 'none', 'few', false, false, false, false, 'No honey in the honey super yet.\\nLarge bee population, bees started getting more and more agitated.\\nAt the start of last box, bee got up into my glove and stung me. The set them off. Soft brush was not getting them off me. Tracie and I got stung on our wrists new Inspection(and my ankles) multiple times.\\nHad to bail on inspection.\\nDid not spit queen or see any eggs.\\nBring stuff brush next time.'),
    new Inspection(10, 1, '2024-3-31', 'Hive A', 3, 15, '16:04:46', 49, 'Overcast', 'calm', 'low', 'low', 'good', 'none', 'none', false, false, false, false, '3/31/2024 - replaced old Sugar Syrup with new bucket of sugar syrup with Lemongrass and spearmint Essential oils \\nOriginal Sugar Syrup was added 3/15/2024, and it had 1 tsp of sugar syrup left so about 2 weeks supply.\\n\\non 3/15/2024 we removed the quilt box. There was no inner cover because of the quilt box so we had to run and get it from the garage.  The bees had secured the quilt box to the frame so it was a bit of a struggle getting it off. We only had on 1/2 suits and Tracie got stung on the inner thigh. We placed the sugar syrup and closed the box quickly and retreated.  \\n\\nWe fully suited up and retuned. new Inspection(Tracie wiped the sting with vinegar to remove any scent)  We pulled the white bottom board panel to make sure the sugar syrup was not just leaking/pouring out.  We adjusted the Bee Cozy to allow bees to still enter/exit from top and bottom \\n\\n5 cups of water / 2 1/2 pounds sugar 1/8 tsp Lecithin 15 drops Lemongrass 15 drops Spearmint \\n'),
    new Inspection(11, 1, '2024-4-9', 'Hive A', 3, 15, '14:18:03', 76, 'Overcast', 'nervous', 'normal', 'low', 'good', 'none', 'few', false, false, false, false, ''),
    new Inspection(12, 2, '2024-5-13', 'Hive B', 3, 15, '11:05:30', 77, 'Clear Sky', 'calm', 'crowded', 'normal', 'good', 'none', 'none', false, false, false, false, 'Used wrong link for bee tracker, creating inspection report.\\nDid not see eggs or queen.\\nTook a few pictures, think we have queen cells\\nGoing to place shallow and Queen excluder later this afternoon to try to get honey'),
    new Inspection(13, 1, '2025-6-8', 'Hive A', 3, 15, '12:08:06', 74, 'Clear Sky', 'calm', 'normal', 'low', 'good', 'none', 'few', false, false, false, false, ''),
  ]);
  public inspections$ = this._inspections.asObservable();

  constructor() { }

  getInspectionById(id: number): Observable<Inspection | undefined> {
    return this.inspections$.pipe(
      map((inspections: Inspection[]) => inspections.find(inspection => inspection.inspection_id === id))
    );
  }

  addInspection(newInspection: Inspection) {
    const currentInspections = this._inspections.getValue();
    this._inspections.next([...currentInspections, newInspection]);
  }

  updateInspection(updatedInspection: Inspection) {
    const currentInspections = this._inspections.getValue();
    const updatedInspections = currentInspections.map(inspection =>
      inspection.inspection_id === updatedInspection.inspection_id ? updatedInspection : inspection
    );
    this._inspections.next(updatedInspections);
  }

  updateInspectionNotes(inspectionId: number, newNotes: string) {
    const currentInspections = this._inspections.getValue();
    const updatedInspections = currentInspections.map(inspection => {
      if (inspection.inspection_id === inspectionId) {
        return { ...inspection, notes: newNotes };
      }
      return inspection;
    });
    this._inspections.next(updatedInspections);
  }

  getNextID(): Observable<number> {
    return this.inspections$.pipe(
      map(inspections => {
        if (inspections.length === 0) {
          return 1;
        }
        const highestID: number = Math.max(...inspections.map(inspection => inspection.inspection_id));
        return highestID + 1;
      })
    )
  }
}