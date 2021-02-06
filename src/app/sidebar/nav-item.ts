export interface NavItem {
    text: string;
    appPrivileage?: string;
    save?:string;
    icon?: string;
    path?: string;
    links?: NavItem[];
  }
  