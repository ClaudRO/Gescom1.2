import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    /*solo las url inicio,registro y login estan implementadasd*/
    { title: 'Inbox', url: 'crear-transaccion', icon: 'mail' },
    { title: 'Outbox', url: 'crear-proveedor', icon: 'paper-plane' },
    { title: 'Favorites', url: 'crear-producto', icon: 'heart' },
    { title: 'Archived', url: 'inicio', icon: 'archive' },
    { title: 'Trash', url: 'registro', icon: 'trash' },
    { title: 'Spam', url: 'login', icon: 'warning' },
    { title: 'historia', url: 'historial', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
