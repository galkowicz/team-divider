import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {Player} from '../player';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnChanges {
  @Input() teamA: Player[];
  @Input() teamB: Player[];
  @Output() selected = new EventEmitter<object>();
  private biggestTeam;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
      const isTeamsInit = this.teamA && this.teamB;
    if (isTeamsInit) {
      if (this.teamA.length > this.teamB.length) {
        this.biggestTeam = this.teamA;
      } else {
        this.biggestTeam = this.teamB;
      }
    }
  }

  select({player, team}: {player: Player, team: string}) {
    this.selected.emit({player, team});
  }

}
