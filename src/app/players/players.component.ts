import {Component, OnInit} from '@angular/core';
import {Player} from '../player';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: Player[];
  teamA: Player[];
  teamB: Player[];
  currentTeam = 'teamA';
  toggleSlider = 'left';
  checked = false;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerService.loadAll();
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.data
      .subscribe((data) => {
        this.players = data.players;
        this.teamA = data.teamA;
        this.teamB = data.teamB;
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.playerService.addPlayer({name, id: '_' + Math.random().toString(36).substr(2, 9)});
  }

  select(player: Player) {
    this.playerService.selectPlayer(player, this.currentTeam);
    this.toggle();
  }

  onPlayerClick({player, team}) {
    this.add(player.name);
    this.playerService.removePlayerFromTeam(player, team);
  }

  delete(player: Player): void {
    this.players = this.players.filter(h => h !== player);
    this.playerService.deletePlayer(player);
  }

  toggle() {
    this.currentTeam = 'teamA' === this.currentTeam ? 'teamB' : 'teamA';
    this.toggleSlider = 'left' === this.toggleSlider ? 'right' : 'left';
    this.checked = !this.checked;
  }

}
