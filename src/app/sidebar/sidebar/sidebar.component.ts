import { AfterViewInit, ViewChild,HostBinding } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavItem } from '../nav-item';
import { NavService } from '../../services/nav-service.service';
import { trigger,state,style,animate,transition} from '@angular/animations';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('toggleWidth', [
      // ...
      state('true', style({
        'width': '{{tWidth}}'
      }),{params: {tWidth: '400px'}}),
      state('false', style({
        'width': '{{tWidth}}'
      }),{params: {tWidth: '400px'}}),
      transition('*=>*', animate(300))
    ]),
    trigger('setPosition', [
      // ...
      state('true', style({
        'margin-left': '0px'
      })),
      state('false', style({
        'margin-left': '{{left}}',
     
      }),{params: {left: '400px'}}),
      transition('*=>*', animate(300))
    ]),
  ],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  public menuState = {
    first_level_expanded:false,
    second_level_expanded:false,
    firstLevelWidth:'30px',
    firstLevelFullWidth:'0px',
    secondLevelMenu:null,
    firstLevelShowFullWidth:true,
    secondLevelPosition:'-200px'
  }; 
 
  public navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'recent_actors',
      route: '',
      children: [
        {
          displayName: 'Submenu 1',
          iconName: 'star_rate',
          route: ''
        },
        {
          displayName: 'Submenu 2',
          iconName: 'star_rate',
          route: ''
        },
        {
          displayName: 'Submenu 3',
          iconName: 'star_rate',
          route: ''
        },
        {
          displayName: 'Submenu 4',
          iconName: 'star_rate',
          route: ''
        }
      ]

    },
    {
      displayName: 'Web Management',
      iconName: 'speaker_notes',
      children: [
        {
          displayName: 'Submenu 2',
          iconName: 'computer',
          route: ''
        },
        {
          displayName: 'Submenu 2',
          iconName: 'router',
          route: ''
        },
        {
          displayName: 'Submenu 2',
          iconName: 'tablet',
          route: ''
        },
        {
          displayName: 'Submenu 2',
          iconName: 'watch',
          route: ''
        }
      ]
    },
    {
      displayName: 'Product Management',
      iconName: 'speaker_notes'
     
    }
  ];
  @ViewChild('appDrawer') appDrawer: ElementRef;

  constructor(private navService: NavService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.menuState.firstLevelFullWidth = document.getElementsByClassName('level1')[0].clientWidth-30+'px';
    setTimeout(()=>{
       this.menuState.firstLevelShowFullWidth = false;
    },100);
    
  }

  toggleMain()
  {
   
    if (!this.menuState.first_level_expanded)
    {
      this.menuState.firstLevelWidth  = this.menuState.firstLevelFullWidth;
      this.menuState.first_level_expanded = true;
     

    }
    else {
      this.menuState.firstLevelWidth  = '30px';
      this.menuState.first_level_expanded = false;
    }
  }

  toggleLevelTwo(menuItem,state)
  {
    if (menuItem.children)
    {
      
      this.menuState.secondLevelMenu = menuItem.children;
      
     // this.menuState.secondLevelWidth = 65+this.setWidth(menuItem.children)+'px';
      this.setAnimationPositions(state);
      
    }
    else {
      //back to level 1
      this.setAnimationPositions(3);
    }
    return false;
    
  }

  setWidth(menuItem:NavItem[]):number
  {
    let maxCharacters = 0;
    menuItem.forEach(element => {
      if (maxCharacters < element.displayName.length)
      {
        maxCharacters = element.displayName.length;

      }
    });
    return maxCharacters * 11;
  }

  onAnimationEvent(event)
  {
    if (event.triggerName == "toggleWidth" && event.phaseName=="done" && event.toState==true) {
      this.menuState.firstLevelShowFullWidth = true;
    }
    else if  (event.triggerName == "toggleWidth" && event.phaseName=="done" && event.toState==false) 
    {
      this.menuState.firstLevelShowFullWidth = false;
    }
    // if (event.eventPhase=="start")
  }

  setAnimationPositions(type)
  {
    let position = 66;
    if (this.menuState.first_level_expanded)
    {
      position += parseInt(this.menuState.firstLevelWidth);
    }
    if (type == 2)
    {
      if (!this.menuState.second_level_expanded)
      {
       
       this.menuState.secondLevelPosition = position+'px';
       this.menuState.second_level_expanded = true;
      }
      
    }
    else if (type == 1)
    {
      this.menuState.firstLevelWidth = 65 + this.setWidth(this.navItems)+'px';
      if (this.menuState.second_level_expanded)
      {
        this.menuState.secondLevelPosition = this.menuState.firstLevelWidth;
      }
      
      this.menuState.first_level_expanded = true;
      
    }

    else if (type == 3)
    {
  
      if (this.menuState.second_level_expanded)
      {
        this.menuState.secondLevelPosition = -document.getElementsByClassName('level2')[0].clientWidth+'px';
        this.menuState.second_level_expanded = false;
        
      }
      
      
      
    }
    

  }

}
