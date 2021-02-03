import { Component, OnInit } from '@angular/core';
import {NavService} from '../../services/nav-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public navService: NavService) { }

  ngOnInit(): void {
    
  }

}
