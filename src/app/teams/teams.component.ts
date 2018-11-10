import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../player';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @Input() teamA: Player[];
  @Input() teamB: Player[];
  @Output() selected = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
  }

  select({player, team}: {player: Player, team: string}) {
    this.selected.emit({player, team});
  }

}
