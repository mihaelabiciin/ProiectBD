import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  availableTabs = ['restaurante', 'locatii', 'hoteluri'];
  selectedTab: string = "restaurante"

  ngOnInit() {
  }
  tabSelected(id: string) {
    
    this.availableTabs.forEach(id => {
      
      const element = document.getElementById(id);
    if (element) {
      element.classList.remove('selected-tab');
    }
    });
    const element = document.getElementById(id);
    if (element) {
      this.selectedTab = id;
      element.classList.add('selected-tab');
    }
  }
}
