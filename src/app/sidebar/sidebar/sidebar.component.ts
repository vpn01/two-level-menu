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
 
  public navItems:NavItem[];
  @ViewChild('appDrawer') appDrawer: ElementRef;

  constructor(private navService: NavService) { 
    this.navItems = this.getData();
  }

  ngOnInit(): void {
  
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.menuState.firstLevelFullWidth = document.getElementsByClassName('level1')[0].clientWidth-30+'px';
    setTimeout(()=>{
       this.menuState.firstLevelShowFullWidth = false;
    },100);
    
  }

  toggleMain(val = 0)
  {
   
    if (!this.menuState.first_level_expanded)
    {
      this.menuState.firstLevelWidth  = this.menuState.firstLevelFullWidth;
      this.menuState.first_level_expanded = true;
     

    }
    else {
      if (val == 0)
      {
        this.menuState.firstLevelWidth  = '30px';
        this.menuState.first_level_expanded = false;
      }
      
    }
  }

  toggleLevelTwo(menuItem,state)
  {
    if (menuItem.links)
    {
      
      this.menuState.secondLevelMenu = menuItem.links;
      this.setAnimationPositions(state);
      return false;
    }
    else {
      //back to level 1
      this.setAnimationPositions(3);
    }
    
    
  }

  setWidth(menuItem:NavItem[]):number
  {
    let maxCharacters = 0;
    menuItem.forEach(element => {
      if (maxCharacters < element.text.length)
      {
        maxCharacters = element.text.length;

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

  disable()
  {
    return false;
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
      // this.menuState.firstLevelWidth = 65 + this.setWidth(this.navItems)+'px';
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

   
getData() {

  return [
    {
      text: 'Dashboard',
      appPrivileage: 'VIEW DASHBOARD',
      icon: 'dvr',
      path: '/main/dashboard'
    },
    {
      text: 'Web Management',
      appPrivileage: 'VIEW WEB_MANAGEMENT',
      save: 'VIEW_WEB_MANAGEMENT_expanded',
      icon: 'web',
      links: [
        { path: '/main/image-upload/product-upload', text: 'Upload Product Images', appPrivileage: 'VIEW WEB_MANAGEMENT' },
        { path: '/main/file-upload/section-images', text: 'Section Images', appPrivileage: 'VIEW WEB_MANAGEMENT' },
        { path: '/main/file-upload/edit-sections', text: 'Edit Sections', appPrivileage: 'VIEW WEB_MANAGEMENT' },
        { path: '/main/web-settings/enable-functionalities', text: 'Enable Functionalities', appPrivileage: 'VIEW WEB_MANAGEMENT' },
        { path: '/main/web-settings/update-information', text: 'Update information', appPrivileage: 'VIEW WEB_MANAGEMENT' },
        { path: '/main/web-settings/update-information', text: 'Update information', appPrivileage: 'VIEW WEB_MANAGEMENT' },
        { path: '/main/file-upload/main-slide', text: 'Main Slide', appPrivileage: 'VIEW WEB_MANAGEMENT' },
      ]
    },
    {
      text: 'Product Management',
      appPrivileage: 'VIEW PRODUCT_MANAGEMENT',
      save: 'VIEW_PRODUCT_MANAGEMENT_expanded',
      icon: 'storage',
      links: [
        { path: '/main/product-entey/create-product-catalog', text: 'Create Product Catalog', appPrivileage: 'NEW PRODUCT' },
        { path: '/main/product-entey/new-product', text: 'New Product', appPrivileage: 'NEW PRODUCT' },
        { path: '/main/product-entey/product-list', text: 'Product List', appPrivileage: 'LIST PRODUCT' },
        { path: '/main/product-entey/bundle-list', text: 'Bundle List', appPrivileage: 'LIST BUNDLE' },
        { path: '/main/product-entey/category-list', text: 'Category List', appPrivileage: 'LIST CATEGORY' },
        { path: '/main/product-entey/brand-list', text: 'Brand List', appPrivileage: 'LIST BRAND' },

      ]
    },
    {
      text: 'Stock Management',
      appPrivileage: 'VIEW STOCK_MANAGEMENT',
      save: 'VIEW_STOCK_MANAGEMENT_expanded',
      icon: 'assignment_returned',
      links: [
        { path: '/main/stock-management/opening-stock', text: 'Opening Stock', appPrivileage: 'VIEW OPENING_STOCK' },
        { path: '/main/stock-management/purchase-order', text: 'Purchase Order', appPrivileage: 'VIEW PO' },
        { path: '/main/stock-management/grn-entry', text: 'Goods Received Note', appPrivileage: 'VIEW GRN' },
        {
          text: 'Stock View',
          appPrivileage: 'VIEW STOCK',
          save: 'VIEW_STOCK_TRANSFER_expanded',
          links: [
            { path: '/main/stock-management/stock-view', text: 'Current Stock', appPrivileage: 'VIEW STOCK' },
            { path: '/main/stock-management/stock-histor', text: 'Stock History', appPrivileage: 'VIEW STOCK' },

          ]
        },
        {
          text: 'Stock Transfer',
          appPrivileage: 'VIEW STOCK_TRANSFER',
          save: 'VIEW_TRANSFER_expanded',
          links: [
            { path: '/main/stock-management/stock-transfer-outlets', text: 'Products Transfer', appPrivileage: 'VIEW STOCK_TRANSFER' },
            { path: '/main/stock-management/stock-reduce', text: 'Stock Reduce', appPrivileage: 'VIEW STOCK_TRANSFER' },
            { path: '/main/stock-management/transit-transfer', text: 'Inter-Stock Transfer', appPrivileage: 'VIEW STOCK_TRANSFER' },
            { path: '/main/stock-management/inter-outlet-transfer', text: 'Inter-Outlet Transfer', appPrivileage: 'VIEW STOCK_TRANSFER' },
            { path: '/main/stock-management/inter-location-transfer', text: 'Inter-Location Transfer', appPrivileage: 'VIEW STOCK_TRANSFER' },

          ]
        },
        {
          text: 'Stock Receive',
          appPrivileage: 'VIEW STOCK_RECEIVE',
          save: 'VIEW_STOCK_RECEIVE_expanded',
          links: [
            { path: '/main/stock-management/stock-receive-view/', text: 'Products Receive', appPrivileage: 'VIEW STOCK_RECEIVE' },
            { path: '/main/stock-management/stock-receive', text: 'Inter-Outlet Receive', appPrivileage: 'VIEW STOCK_RECEIVE' },
            { path: '/main/stock-management/inter-location-receive', text: 'Inter-Location Receive', appPrivileage: 'VIEW STOCK_RECEIVE' },
          ]
        },
        {
          text: 'Supplier',
          appPrivileage: 'VIEW SUPPLIER',
          save: 'VIEW_SUPPLIER_expanded',
          links: [
            { path: '/main/stock-management/new-supplier', text: 'New Supplier', appPrivileage: 'VIEW SUPPLIER' },
            { path: '/main/stock-management/supplier-list', text: 'Supplier List', appPrivileage: 'VIEW SUPPLIER' },
          ]
        },
        { path: '/main/stock-management/barcode-print', text: 'Barcode Print', appPrivileage: 'BARCODE STOCK' },
        {
          text: 'Return Note',
          appPrivileage: 'VIEW RETURN',
          save: 'VIEW_RETURN_expanded',
          links: [
            {
              text: 'Supplier Return',
              appPrivileage: 'VIEW RETURN',
              save: 'VIEW_RETURN_Supplier_Return_expanded',
              links: [
                { path: '/main/stock-management/return-supplier-grn', text: 'GRN Wise', appPrivileage: 'VIEW RETURN' },
                { path: '/main/stock-management/return-supplier-item', text: 'Item Wise', appPrivileage: 'VIEW RETURN' },
              ]
            },
            {
              text: 'Customer Return',
              appPrivileage: 'VIEW RETURN',
              save: 'VIEW_RETURN_Customer_Return_expanded',
              links: [
                { path: '/main/stock-management/return-customer-invoice', text: 'Invoice Wise', appPrivileage: 'VIEW RETURN' },
                { path: '/main/stock-management/return-customer-item', text: 'Item Wise', appPrivileage: 'VIEW RETURN' },
              ]
            }
          ]
        },
        {
          text: 'Stock Location',
          appPrivileage: 'VIEW STOCK_LOCATION',
          save: 'VIEW_STOCK_LOCATION_expanded',
          links: [
            { path: '/main/stock-management/warehouse', text: 'Warehouse', appPrivileage: 'VIEW STOCK_LOCATION' },
            { path: '/main/stock-management/bin', text: 'Bin', appPrivileage: 'VIEW STOCK_LOCATION' },
          ]
        },
        {
          text: 'Price Tag',
          appPrivileage: 'VIEW DASHBOARD',
          save: 'Price_Tag_expanded',
          links: [
            { path: '/main/stock-management/new-price-tag', text: 'New Price Tag', appPrivileage: 'VIEW DASHBOARD' },
            { path: '/main/stock-management/price-tag-list', text: 'Price Tag List', appPrivileage: 'VIEW DASHBOARD' },
          ]
        },
        {
          text: 'Stock Take',
          appPrivileage: 'VIEW DASHBOARD',
          save: 'Stock_Take_expanded',
          links: [
            { path: '/main/stock-management/new-stock-take', text: 'New Stock Take', appPrivileage: 'VIEW DASHBOARD' },
            { path: '/main/stock-management/stock-take-list', text: 'Stock Take List', appPrivileage: 'VIEW DASHBOARD' },
          ]
        },
        {
          text: 'Stock Adjustment',
          appPrivileage: 'VIEW DASHBOARD',
          save: 'Stock_Adjustment_expanded',
          links: [
            { path: '/main/stock-management/sale-price', text: 'Sale Price', appPrivileage: 'VIEW DASHBOARD' },
          ]
        }
      ]
    },
    {
      text: 'Delivery Management',
      appPrivileage: 'VIEW DELIVERY_MANAGEMENT',
      save: 'VIEW_DELIVERY_MANAGEMENT_expanded',
      icon: 'local_shipping',
      links: [
        {
          text: 'Daraz',
          appPrivileage: 'VIEW DARAZ',
          save: 'VIEW_DARAZ_expanded',
          links: [
            { path: '/main/delivery-management/upload', text: 'Upload', appPrivileage: 'VIEW DARAZ' },
            { path: '/main/delivery-management/new-orders', text: 'New Orders', appPrivileage: 'VIEW DARAZ' },
            {
              text: 'Orders',
              appPrivileage: 'VIEW DARAZ',
              save: 'VIEW_DARAZ_Orders_expanded',
              links: [
                { path: '/main/delivery-management/pending-orders', text: 'Ready To Pack', appPrivileage: 'VIEW DARAZ' },
                { path: '/main/delivery-management/packed-orders', text: 'Packed Orders', appPrivileage: 'VIEW DARAZ' },
                { path: '/main/delivery-management/ready-to-ship', text: 'Ready To Ship', appPrivileage: 'VIEW DARAZ' },
                { path: '/main/delivery-management/shipped-orders', text: 'Shipped Orders', appPrivileage: 'VIEW DARAZ' },
                { path: '/main/delivery-management/return', text: 'Return', appPrivileage: 'VIEW DARAZ' },
              ]
            },
            { path: '/main/delivery-management/reports', text: 'Reports', appPrivileage: 'VIEW DARAZ' },
            { path: '/main/delivery-management/product-attachment', text: 'Product Attachment', appPrivileage: 'VIEW DARAZ' },
            { path: '/main/delivery-management/invoicing', text: 'Invoicing', appPrivileage: 'VIEW DARAZ' },
            { path: '/main/delivery-management/invoiced-list', text: 'Invoiced List', appPrivileage: 'VIEW DARAZ' },
          ]
        },
        {
          text: 'Dispatch Note',
          appPrivileage: 'VIEW DELIVERY_MANAGEMENT',
          save: 'Dispatch_Note_expanded',
          links: [
            { path: '/main/delivery-management/new-dispatch', text: 'New Dispatch', appPrivileage: 'VIEW DELIVERY_MANAGEMENT' },
          ]
        },
        {
          text: 'Courier',
          appPrivileage: 'VIEW SUPPLIER',
          save: 'VIEW_SUPPLIER_expanded',
          links: [
            { path: '/main/delivery-management/new-courier', text: 'New Courier', appPrivileage: 'VIEW DELIVERY_MANAGEMENT' },
            { path: '/main/delivery-management/courier-list', text: 'Courier List', appPrivileage: 'VIEW DELIVERY_MANAGEMENT' },
          ]
        },
        {
          text: 'Sales Order',
          appPrivileage: 'VIEW SALES_ORDER',
          save: 'VIEW_SALES_ORDER_expanded',
          links: [
            { path: '/main/delivery-management/sales-order-ready-to-pack', text: 'Ready To Pack', appPrivileage: 'VIEW SALES_ORDER' },
            { path: '/main/delivery-management/sales-order-packed-orders', text: 'Packed Orders', appPrivileage: 'VIEW SALES_ORDER' },
            { path: '/main/delivery-management/sales-order-dispatched-orders', text: 'Dispatched', appPrivileage: 'VIEW SALES_ORDER' },
            { path: '/main/delivery-management/sales-order-delivered-orders', text: 'Delivered', appPrivileage: 'VIEW SALES_ORDER' },
            { path: '/main/delivery-management/sales-order-returned-orders', text: 'Returned', appPrivileage: 'VIEW SALES_ORDER' },
          ]
        },
      ]
    },
    {
      text: 'Rent Management',
      appPrivileage: 'VIEW RENT_MANAGEMENT',
      save: 'VIEW_RENT_MANAGEMENT_expanded',
      icon: 'build',
      links: [
        { path: '/main/rent-management/rent-item-entry', text: 'Rent Item Entry', appPrivileage: 'VIEW RENT_MANAGEMENT' },
      ]
    },
    {
      text: 'Promotion Management',
      appPrivileage: 'VIEW PROMOTION_MANAGEMENT',
      save: 'VIEW_PROMOTION_MANAGEMENT_expanded',
      icon: 'sms',
      links: [
        {
          text: 'Create Promotion',
          appPrivileage: 'VIEW PROMOTION_MANAGEMENT',
          save: 'VIEW_PROMOTION_MANAGEMENT_Create_Promotion_expanded',
          links: [
            { path: '/main/promotion-management/create-audience', text: 'Create Audience', appPrivileage: 'VIEW PROMOTION_MANAGEMENT' },
          ]
        },
        { path: '/main/promotion-management/sms-campaign', text: 'SMS Campaign', appPrivileage: 'VIEW PROMOTION_MANAGEMENT' },
      ]
    },
    {
      text: 'Sales Management',
      appPrivileage: 'VIEW SALES_MANAGEMENT',
      save: 'VIEW_SALES_MANAGEMENT_expanded',
      icon: 'attach_money',
      links: [
        { path: '/main/sales-management/invoice', text: 'Invoice', appPrivileage: 'VIEW BILL' },
        { path: '/main/report-management/day-end', text: 'Day End', appPrivileage: 'VIEW DAY_END' },
        { path: '/main/web-settings/web-orders', text: 'Web Orders', appPrivileage: 'VIEW WEB_ORDERS' },
        { path: '/main/sales-management/cancellations', text: 'Cancellations', appPrivileage: 'VIEW CANCELLATION' },
        { path: '/main/sales-management/trip-history', text: 'Trip History', appPrivileage: 'VIEW TRIP_HISTORY' },
        { path: '/main/sales-management/sales-order', text: 'Sales Order', appPrivileage: 'VIEW SALES_ORDER' },
      ]
    },
    {
      text: 'Tailor Management',
      appPrivileage: 'VIEW TAYLOR_MANAGEMENT',
      save: 'VIEW_TAYLOR_MANAGEMENT_expanded',
      icon: 'straighten',
      links: [
        { path: '/main/taylor-management/place-order', text: 'Place Order', appPrivileage: 'VIEW TAYLOR_MANAGEMENT' },
        { path: '/main/taylor-management/measurement', text: 'measurement', appPrivileage: 'VIEW TAYLOR_MANAGEMENT' }
      ]
    },
    {
      text: 'Report Management',
      appPrivileage: 'VIEW REPORTS_MANAGEMENT',
      save: 'VIEW_REPORTS_MANAGEMENT_expanded',
      icon: 'style',
      links: [
        {
          text: 'Sales Reports',
          appPrivileage: 'REPORTS BILL',
          save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_BILL_expanded',
          links: [
            { path: '/main/sales-reports/bill-wise', text: 'Bill Wise', appPrivileage: 'REPORTS BILL' },
            { path: '/main/sales-reports/item-wise', text: 'Item Wise', appPrivileage: 'REPORTS BILL' },
            { path: '/main/sales-reports/supplier-wise', text: 'Supplier Wise', appPrivileage: 'REPORTS BILL' },
            { path: '/main/web-settings/sales-person-wise', text: 'Sales Person Wise', appPrivileage: 'REPORTS BILL' },
            { path: '/main/sales-reports/date-wise', text: 'Date Wise', appPrivileage: 'REPORTS BILL' },
            { path: '/main/sales-reports/payment-wise', text: 'Payment Wise', appPrivileage: 'REPORTS BILL' },
            { path: '/main/sales-reports/customer-wise-report', text: 'Customer Wise Report', appPrivileage: 'REPORTS BILL' },
            { path: '/main/sales-reports/category-wise', text: 'Category Wise', appPrivileage: 'REPORTS BILL' },
            { path: '/main/sales-reports/sales-orders', text: 'Sales Orders', appPrivileage: 'REPORTS BILL' }
          ]
        },
        {
          text: 'Service Reports',
          appPrivileage: 'REPORTS SERVICE',
          save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_SERVICE_expanded',
          links: [
            { path: '/main/sales-reports/bill-wise-service', text: 'Bill Wise', appPrivileage: 'REPORTS SERVICE' },
          ]
        },
        {
          text: 'Stock Reports',
          appPrivileage: 'REPORTS STOCK',
          save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_STOCK_expanded',
          links: [
            {
              text: 'Stock Transfer',
              appPrivileage: 'REPORTS STOCK',
              save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_STOCK_Stock_Transfer_expanded',
              links: [
                { path: '/main/report-management/stock-transfer', text: 'Summary', appPrivileage: 'REPORTS STOCK' },
                { path: '/main/report-management/stock-transfer-details', text: 'Details', appPrivileage: 'REPORTS STOCK' }
              ]
            },
            {
              text: 'Stock Receive',
              appPrivileage: 'REPORTS STOCK',
              save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_STOCK_Stock_Receive_expanded',
              links: [
                { path: '/main/report-management/stock-receive', text: 'Summary', appPrivileage: 'REPORTS STOCK' },
                { path: '/main/report-management/stock-receive-details', text: 'Details', appPrivileage: 'REPORTS STOCK' }
              ]
            },
            { path: '/main/report-management/inter-stock-transfer', text: 'Inter-Stock Transfer', appPrivileage: 'REPORTS STOCK' },
            { path: '/main/report-management/inter-outlet-transfer-reports', text: 'Inter-Outlet Transfer', appPrivileage: 'REPORTS STOCK' },
          ]
        },
        {
          text: 'GRN Reports',
          appPrivileage: 'REPORTS GRN',
          save: 'VIEW_REPORTS_MANAGEMENT_GRN_Reports_expanded',
          links: [
            {
              text: 'GRN Wise',
              appPrivileage: 'REPORTS GRN',
              save: 'VIEW_REPORTS_MANAGEMENT_GRN_Reports_GRN_Wise_expanded',
              links: [
                { path: '/main/report-management/grn-reports', text: 'Summary', appPrivileage: 'REPORTS GRN' },
                { path: '/main/report-management/grn-wise-details', text: 'Details', appPrivileage: 'REPORTS GRN' },
              ]
            },
            { path: '/main/report-management/grn-aged-analysis', text: 'Aged Analysis', appPrivileage: 'REPORTS GRN' },
          ]
        },
        { path: '/main/report-management/po-reports', text: 'PO Reports', appPrivileage: 'REPORTS PO' },
        {
          text: 'Cashier Reports',
          appPrivileage: 'REPORTS CASHIER',
          save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_CASHIER_expanded',
          links: [
            { path: '/main/report-management/day-end-se', text: 'Day End', appPrivileage: 'REPORTS CASHIER' },
          ]
        },
        {
          text: 'Dispatch Reports',
          appPrivileage: 'REPORTS DISPATCH',
          save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_DISPATCH_expanded',
          links: [
            { path: '/main/report-management/bill-wise', text: 'Bill Wise', appPrivileage: 'REPORTS DISPATCH' },
            { path: '/main/report-management/person-wise', text: 'Sales Person Wise', appPrivileage: 'REPORTS DISPATCH' },
            { path: '/main/report-management/item-wise', text: 'Item Wise', appPrivileage: 'REPORTS DISPATCH' },
            { path: '/main/report-management/courier-wise', text: 'Courier Wise', appPrivileage: 'REPORTS DISPATCH' },
          ]
        },
        {
          text: 'Account Reports',
          appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT',
          save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_ACCOUNT_MANAGEMENT_expanded',
          links: [
            {
              text: 'Payment Voucher',
              appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT',
              save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_Payment_Voucher_expanded',
              links: [
                { path: '/main/report-management/payment-vouche', text: 'Supplier', appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT' },
                { path: '/main/report-management/service-creditor', text: 'Service Supplier', appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT' },
                { path: '/main/report-management/payment-voucher-bills', text: 'Bills', appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT' },
              ]
            },
            {
              text: 'Receipt Voucher',
              appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT',
              save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_Receipt_Voucher_expanded',
              links: [
                { path: '/main/report-management/payment-vouche-debtor', text: 'Customer', appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT' },
              ]
            },
            {
              text: 'Creditor',
              appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT',
              save: 'VIEW_REPORTS_MANAGEMENT_Creditor_expanded',
              links: [
                { path: '/main/report-management/payment-reports', text: 'Listing', appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT' },
                { path: '/main/report-management/aged-analysis', text: 'Aged Analysis', appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT' },
              ]
            },
            {
              text: 'Debtor',
              appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT',
              save: 'VIEW_REPORTS_MANAGEMENT_Debtor_expanded',
              links: [
                { path: '/main/report-management/payment-reports-customer', text: 'Listing', appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT' },
                { path: '/main/report-management/debtor-aged-analysis', text: 'Aged Analysis', appPrivileage: 'REPORTS ACCOUNT_MANAGEMENT' },
              ]
            },
            {
              text: 'Petty Cash Reports',
              appPrivileage: 'REPORTS PETTY_CASH',
              save: 'VIEW_REPORTS_MANAGEMENT_Petty_Cash_Reports_expanded',
              links: [
                { path: '/main/report-management/petty-cash', text: 'Summary', appPrivileage: 'REPORTS PETTY_CASH' },
              ]
            },
          ]
        },
        {
          text: 'Return Reportss',
          appPrivileage: 'REPORTS RETURN',
          save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_RETURN_expanded',
          links: [
            {
              text: 'Customer Return',
              appPrivileage: 'REPORTS RETURN',
              save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_RETURN_Customer_Return_expanded',
              links: [
                { path: '/main/report-management/customer-return-bill-wise', text: 'Bill Wise', appPrivileage: 'REPORTS RETURN' },
                { path: '/main/report-management/customer-return-item-wise', text: 'Item Wise', appPrivileage: 'REPORTS RETURN' },
              ]
            },
            {
              text: 'Supplier Return',
              appPrivileage: 'REPORTS RETURN',
              save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_RETURN_Supplier_Return_expanded',
              links: [
                { path: '/main/report-management/supplier-return-grn-wise', text: 'GRN Wise', appPrivileage: 'REPORTS RETURN' },
                { path: '/main/report-management/supplier-return-item-wise', text: 'Item Wise', appPrivileage: 'REPORTS RETURN' },
              ]
            },
          ]
        },
        {
          text: 'Cancellation Reports',
          appPrivileage: 'REPORTS CANCELLATION',
          save: 'VIEW_REPORTS_MANAGEMENT_REPORTS_CANCELLATION_expanded',
          links: [
            { path: '/main/report-management/invoice-cancellation', text: 'Invoice Cancellation', appPrivileage: 'REPORTS CANCELLATION' },
          ]
        },
      ]
    },
    {
      text: 'Customer Management',
      appPrivileage: 'VIEW CUSTOMER_MANAGEMENT',
      save: 'VIEW_CUSTOMER_MANAGEMENT_expanded',
      icon: 'contacts',
      links: [
        { path: '/main/customer-management/new-customer', text: 'New Customer', appPrivileage: 'NEW CUSTOMER' },
        { path: '/main/customer-management/customer-list', text: 'Customer List', appPrivileage: 'LIST CUSTOMER' },
        {
          text: 'Barcode Print',
          appPrivileage: 'BARCODE CUSTOMER',
          save: 'VIEW_CUSTOMER_MANAGEMENT_Barcode_Print_expanded',
          links: [
            { path: '/main/customer-management/customer-barcode-print', text: 'New Customer', appPrivileage: 'BARCODE CUSTOMER' },
            { path: '/main/customer-management/customer-uuid-print', text: 'UUID Print', appPrivileage: 'BARCODE CUSTOMER' },
          ]
        },
        {
          text: 'Loyalty Customer',
          appPrivileage: 'BARCODE CUSTOMER',
          save: 'VIEW_CUSTOMER_MANAGEMENT_Loyalty_Customer_expanded',
          links: [
            { path: '/main/account-management/loyalty-customer-import', text: 'Import', appPrivileage: 'VIEW CUSTOMER_MANAGEMENT' },
          ]
        },
        {
          text: 'Customer Discount',
          appPrivileage: 'VIEW CUSTOMER_MANAGEMENT',
          save: 'VIEW_CUSTOMER_MANAGEMENT_Customer_Discount_expanded',
          links: [
            { path: '/main/account-management/new-customer-discount', text: 'New Customer Discount', appPrivileage: 'VIEW CUSTOMER_MANAGEMENT' },
            { path: '/main/account-management/customer-discount-list', text: 'Customer Discount List', appPrivileage: 'VIEW CUSTOMER_MANAGEMENT' },
          ]
        }
      ]
    },
    {
      text: 'Membership Management',
      appPrivileage: 'VIEW MEMEBERSHIP_MANAGEMENT',
      save: 'VIEW_MEMEBERSHIP_MANAGEMENT_expanded',
      icon: 'supervisor_account',
      links: [
        { path: '/main/membership-management/add-member', text: 'Add Member', appPrivileage: 'VIEW MEMEBERSHIP_MANAGEMENT' },
        { path: '/main/membership-management/member-list', text: 'Member List', appPrivileage: 'VIEW MEMEBERSHIP_MANAGEMENT' },
        { path: '/main/membership-management/member-edit', text: 'Edit Member', appPrivileage: 'VIEW MEMEBERSHIP_MANAGEMENT' },
      ]
    },
    {
      text: 'Account Management',
      appPrivileage: 'VIEW ACCOUNT_MANAGEMENT',
      save: 'VIEW_ACCOUNT_MANAGEMENT_expanded',
      icon: 'account_balance',
      links: [
        {
          text: 'Opening Balance',
          appPrivileage: 'VIEW OPENING_BALANCE',
          save: 'VIEW_ACCOUNT_MANAGEMENT_Opening_Balance_expanded',
          links: [
            { path: '/main/account-management/opening-balance', text: 'Creditor', appPrivileage: 'VIEW OPENING_BALANCE' },
            { path: '/main/account-management/opening-balance-debtor', text: 'Debtor', appPrivileage: 'VIEW OPENING_BALANCE' },
          ]
        },
        {
          text: 'Petty Cash',
          appPrivileage: 'VIEW PETTY_CASH',
          save: 'VIEW_ACCOUNT_MANAGEMENT_pety_cash_expanded',
          links: [
            { path: '/main/account-management/add-petty-cash', text: 'Voucher', appPrivileage: 'VIEW PETTY_CASH' },
            { path: '/main/account-management/account-list', text: 'Account List', appPrivileage: 'VIEW PETTY_CASH' },
            { path: '/main/account-management/reimburse', text: 'Reimburse', appPrivileage: 'VIEW PETTY_CASH' },
          ]
        },
        {
          text: 'Cash Book',
          appPrivileage: 'VIEW CASH_BOOK',
          save: 'VIEW_ACCOUNT_MANAGEMENT_cheque_details_expanded',
          links: [
            { path: '/main/account-management/cash-book-statement', text: 'Statement', appPrivileage: 'VIEW CASH_BOOK' },
            { path: '/main/account-management/cash-book-account-list', text: 'Account List', appPrivileage: 'VIEW CASH_BOOK' },
          ]
        },
        {
          text: 'Cheque Details',
          appPrivileage: 'VIEW CHEQUE_DETAILS',
          save: 'VIEW_ACCOUNT_MANAGEMENT_cheque_details_expanded',
          links: [
            { path: '/main/account-management/cheque-list', text: 'Cheque List', appPrivileage: 'VIEW CHEQUE_DETAILS' },
          ]
        },
        {
          text: 'Bill Payable',
          appPrivileage: 'VIEW BILL_PAYABLE',
          save: 'VIEW_ACCOUNT_MANAGEMENT_Bills_expanded',
          links: [
            { path: '/main/account-management/bills-list', text: 'Bills List', appPrivileage: 'VIEW BILL_PAYABLE' },
            { path: '/main/account-management/service-supplier-list', text: 'Service Supplier List', appPrivileage: 'VIEW BILL_PAYABLE' },
          ]
        },
        {
          text: 'Payments',
          appPrivileage: 'VIEW PAYMENT',
          save: 'VIEW_ACCOUNT_MANAGEMENT_payments_expanded',
          links: [
            { path: '/main/account-management/supplier', text: 'Supplier', appPrivileage: 'VIEW PAYMENT' },
            { path: '/main/account-management/payments-bill', text: 'Bills', appPrivileage: 'VIEW PAYMENT' },
          ]
        },
        {
          text: 'Receipts',
          appPrivileage: 'VIEW RECEIPTS',
          save: 'VIEW_ACCOUNT_MANAGEMENT_Receipts_expanded',
          links: [
            { path: '/main/account-management/receipts-customer', text: 'Customer', appPrivileage: 'VIEW RECEIPTS' },
          ]
        },
      ]
    },
    {
      text: 'User Management',
      appPrivileage: 'VIEW USER_MANAGEMENT',
      save: 'USER_MANAGEMENT_MANAGEMENT_expanded',
      icon: 'contacts',
      links: [
        { path: '/main/user-management/all-users', text: 'All Users', appPrivileage: 'VIEW USER' },
        { path: '/main/user-management/new-user', text: 'New User', appPrivileage: 'VIEW USER' },
        { path: '/main/user-management/all-roles', text: 'All Roles', appPrivileage: 'VIEW PERMISSION_ROLES' },
        { path: '/main/user-management/new-role', text: 'New Role', appPrivileage: 'VIEW PERMISSION_ROLES' },
        { path: '/main/user-management/role-capabilities', text: 'Roles Capabilities', appPrivileage: 'VIEW ROLE_CAPABILITIES' },
        { path: '/main/user-management/user-settings', text: 'User Settings', appPrivileage: 'VIEW USER_SETTINGS' },
      ]
    },
  ]

}


}
