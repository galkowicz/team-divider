import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Player} from './player';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersCollection: AngularFirestoreCollection<Player>;
  private teamACollection: AngularFirestoreCollection<Player>;
  private teamBCollection: AngularFirestoreCollection<Player>;
  private toggleStateCollection: AngularFirestoreCollection<{state: string}>;
  players$: Observable<Player[]>;
  teamA$: Observable<Player[]>;
  teamB$: Observable<Player[]>;
  toggleState$: Observable<{state: string}[]>;
  playerDoc: AngularFirestoreDocument<Player>;
  toggleStateDoc: AngularFirestoreDocument<{state: string}>;
  snapshotChangesPlayers;

  constructor(private readonly afs: AngularFirestore) {
    this.playersCollection = afs.collection<Player>('players');
    this.teamACollection = afs.collection<Player>('teamA');
    this.teamBCollection = afs.collection<Player>('teamB');
    this.toggleStateCollection = afs.collection<{state: string}>('toggleState');
    this.snapshotChangesPlayers = this.playersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Player;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  loadAll() {
    this.players$ = this.playersCollection.valueChanges();
    this.teamA$ = this.teamACollection.valueChanges();
    this.teamB$ = this.teamBCollection.valueChanges();
    this.toggleState$ = this.toggleStateCollection.valueChanges();
    this.snapshotChangesPlayers.subscribe(data => {
      this.players$ = data;
    });
  }

  addPlayer(name: string) {
    const id = this.afs.createId();
    const player: Player = {name, id};
    this.playersCollection.doc(id).set(player);
  }

  deletePlayer(player: Player) {
    this.playerDoc = this.afs.doc(`players/${player.id}`);
    this.playerDoc.delete();
  }

  selectPlayer(player: Player, team: string) {
    this[`${team}Collection`].doc(player.id).set(player);
    this.deletePlayer(player);
  }

  removePlayerFromTeam(player: Player, team: string) {
    this.playerDoc = this.afs.doc(`${team}/${player.id}`);
    this.playerDoc.delete();
  }

  toggle(currentTeam) {
    this.toggleStateDoc = this.afs.doc('toggleState/cTfczDPnahVk5tr350vV');
    this.toggleStateDoc.update({state: currentTeam});
  }
}
