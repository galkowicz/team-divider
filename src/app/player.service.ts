import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Player} from './player';
import {Data} from './data';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
data: Observable<Data>;
  private readonly _data: BehaviorSubject<any>;
  private readonly dataStore: {
    players: Player[],
    teamA: Player[],
    teamB: Player[]
  };

  constructor() {
    this.dataStore = {players: [], teamA: [], teamB: []};
    this._data = <BehaviorSubject<any>> new BehaviorSubject({});
    this.data = this._data.asObservable();
  }

  loadAll() {
    this.dataStore.players = JSON.parse(localStorage.getItem('data')) || [];
    this.dataStore.teamA = JSON.parse(localStorage.getItem('teamA')) || [];
    this.dataStore.teamB = JSON.parse(localStorage.getItem('teamB')) || [];
    this._data.next(Object.assign({}, this.dataStore));
  }

  addPlayer(player: Player) {
    this.dataStore.players.push(player);
    this.update();
  }

  deletePlayer(player: Player) {
    this.dataStore.players = this.dataStore.players.filter(h => h !== player);
    this.update();
  }

  selectPlayer(player: Player, team: string) {
    this.dataStore[team].push(player);
    this.deletePlayer(player);
  }

  removePlayerFromTeam(player: Player, team: string) {
    this.dataStore[team] = this.dataStore[team].filter(h => h !== player);
    this.update();
  }

  update() {
    localStorage.setItem('data', JSON.stringify(this.dataStore.players));
    localStorage.setItem('teamA', JSON.stringify(this.dataStore.teamA));
    localStorage.setItem('teamB', JSON.stringify(this.dataStore.teamB));
    this._data.next(Object.assign({}, this.dataStore));
  }
}
