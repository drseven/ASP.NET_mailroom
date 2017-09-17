import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l("HomePage"), "", "home", "/app/home"),
        //         new MenuItem("Home", "", "", "https://aspnetzero.com?ref=abptmpl"),

        new MenuItem(this.l("Adresses"), "", "place", "", [
            new MenuItem(this.l("Negara"), "", "place", "/app/negara"),
            new MenuItem(this.l("Provinsi"), "", "place", "google.com"),
            new MenuItem(this.l("Kota"), "", "place", "google.com"),
            new MenuItem(this.l("Kecamatan"), "", "place", "google.com"),
            new MenuItem(this.l("Keluranah/Desa"), "", "place", "google.com"),
        ]),

        new MenuItem(this.l("User Admin"), "", "account_box", "", [
            new MenuItem(this.l("Users"), "Pages.Users", "people", "/app/users"),
            new MenuItem(this.l("Roles"), "Pages.Roles", "local_offer", "/app/roles"),
            new MenuItem(this.l("User Logs"), "", "history", "/app/logs")
        ]),

        new MenuItem(this.l("HRD and Internal"), "", "people", "", [
            new MenuItem(this.l("Services Users"), "", "assignment_ind", "google.com"),
            new MenuItem(this.l("Mailroom Staff"), "", "contact_mail", "google.com"),
            new MenuItem(this.l("Individual Partner"), "", "contacts", "google.com"),
            new MenuItem(this.l("Individual Courier"), "", "directions_bike", "google.com"),
            new MenuItem(this.l("Messenger"), "", "account_box", "google.com"),
            new MenuItem(this.l("HRD and Intenal Setup"), "", "people", "", [
                new MenuItem(this.l("Job Position"), "", "people", "google.com"),
                new MenuItem(this.l("Floor"), "", "people", "google.com"),
                new MenuItem(this.l("Room"), "", "people", "google.com")  
            ])
        ]),


        new MenuItem(this.l("Offices"), "", "location_city", "", [
            new MenuItem(this.l("Branch Office"), "", "location_city", "google.com"),
            new MenuItem(this.l("Partner Office"), "", "location_city", "google.com"),
            new MenuItem(this.l("Courier Office"), "", "location_city", "google.com"),
            new MenuItem(this.l("Offices Setup"), "", "location_city", "", [
                new MenuItem(this.l("Branch Types"), "", "location_city", "google.com"),
                new MenuItem(this.l("Partner Types"), "", "location_city", "google.com"),
                new MenuItem(this.l("Courier Types"), "", "location_city", "google.com"),
                new MenuItem(this.l("Division"), "", "location_city", "google.com"),
                new MenuItem(this.l("Unit"), "", "location_city", "google.com"),  
                new MenuItem(this.l("Cost Center"), "", "location_city", "google.com")  
            ])
        ]),

        new MenuItem(this.l("Mailroom"), "", "mail", "", [
            new MenuItem(this.l("Incomming"), "", "assignment_returned", "/app/users"),
            new MenuItem(this.l("Outgoing"), "", "assignment_return", "/app/roles"),
            new MenuItem(this.l("Mail Tracker"), "", "local_shipping", "/app/trackers"),
            new MenuItem(this.l("Mailroom"), "", "mail", "", [
                new MenuItem(this.l("Mail Types"), "", "mail", "google.com"),
                new MenuItem(this.l("Mail Contents"), "", "mail", "google.com"),
                new MenuItem(this.l("Manifest Types"), "", "mail", "google.com")  
            ])
        ]),
        
        new MenuItem(this.l("Attachment Explorer"), "", "attach_file", "/app/attachment"),
        new MenuItem(this.l("Reporting"), "", "assignment", "", [
        ]),
        new MenuItem(this.l("About"), "", "info", "/app/about")
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}