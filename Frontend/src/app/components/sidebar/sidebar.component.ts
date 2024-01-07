import { ChangeDetectorRef, Component } from '@angular/core';
import { Location } from '@angular/common';
import { AutorizationService } from 'src/app/services/autorization.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  availableTabs = ['restaurante', 'locatii', 'hoteluri', 'activitati'];
  selectedTab: string = "restaurante"

  constructor(private location: Location,
    public autorizationService: AutorizationService) {

  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    //pentru a selecta tabul la refresh
    const currentUrl = this.location.path();
    this.availableTabs.forEach(element => {
      if (currentUrl.includes(element)) {
        const tab = document.getElementById(element);
        if (tab) {
          tab.classList.add('selected-tab');
        }
      }
    });
    //end pentru a selecta tabul la refresh
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
