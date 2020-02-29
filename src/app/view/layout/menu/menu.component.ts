import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  role: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.role = this.route.snapshot.params["roles"];
  }

}
