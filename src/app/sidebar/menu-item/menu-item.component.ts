import {Component, ElementRef,ViewChild, Input, OnInit, AfterViewInit} from '@angular/core';
import {NavItem} from '../nav-item';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
      
  ]),
  trigger('expandable', [
        state('expand', style({height: "{{subHeight}}"}),{params: {subHeight: '100px'}}),
        state('collapse', style({height: "0px"})),
        transition('* <=> *',
          animate(300)
        )
    ])
  ]
})

export class MenuItemComponent implements OnInit,AfterViewInit {
  expanded: boolean = false;
  subHeight = '0px';
  maxHeight = 0;
  runAnim = false;
  @ViewChild('submenu') submenu:ElementRef<HTMLElement>;
  // @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
 
  constructor(public router:Router) { 


  }

  ngOnInit(): void {
   
  }

  ngAfterViewInit():void {
    
    if (this.submenu != null)
    {
      this.maxHeight = this.submenu.nativeElement.clientHeight;
      this.submenu.nativeElement.style.height = '0px';
    }


  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
  
    }
    if (item.children && item.children.length) {
     
      this.expanded = !this.expanded;
      if (this.expanded)
      {
    
        this.subHeight = this.maxHeight+'px';
        
      }
      this.runAnim = true;
      
      return false;
    
    }
   
  }

  getAnim()
  {
    if (this.runAnim)
    {
      if (this.expanded)
      {
          return 'expand';
      }
      else {
        return 'collapse';
      }
    }
    
  }

}
