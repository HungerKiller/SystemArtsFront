import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HomeResourceViewDetailComponent } from '../home-resource-view-detail/home-resource-view-detail.component';
import { ResourceService } from 'src/app/services/resource.service';
import { Resource } from 'src/app/models/Resource';
import { ResourceFileService } from 'src/app/services/resource-file.service';
import { ApiRoute } from 'src/app/api-routes';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home-resource-view',
  templateUrl: './home-resource-view.component.html',
  styleUrls: ['./home-resource-view.component.scss']
})
export class HomeResourceViewComponent implements OnInit {

  @ViewChild(HomeResourceViewDetailComponent) resourceDetailComponent!: HomeResourceViewDetailComponent;
  resources!: Resource[];
  loading = true;
  currentUploadResourceId!: number;
  fallback = 'data:image/png;base64,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';
  currentUser: User | undefined;

  constructor(
    private resourceService: ResourceService,
    private resourceFileService: ResourceFileService,
    private authService: AuthService,
    private messageService: NzMessageService) { }

  ngOnInit() {
    this.getResources();
    this.getCurrentUser();
  }

  getResources(): void {
    this.loading = true;
    this.resourceService.getResources()
      .subscribe({
        next: resources => {
          this.loading = false;
          this.resources = resources;
          // Set resource file path
          for (let resource of resources) {
            resource.firstResouceFilePath = `${ApiRoute.APPSERVICEHOST}/${resource.resourceFiles[0]?.name}`;
            resource.resourceFilesPath = [];
            resource.resourceFiles.map(f => resource.resourceFilesPath.push(`${ApiRoute.APPSERVICEHOST}/${f.name}`));
          }
        }
      });
  }

  getCurrentUser(): void {
    this.authService.currentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
      else {
        this.currentUser = undefined;
      }
    });
  }

  openResource(selectedResource: Resource): void {
    this.resourceDetailComponent.resource = selectedResource;
    this.resourceDetailComponent.title = selectedResource.title;
    this.resourceDetailComponent.description = selectedResource.description;
    this.resourceDetailComponent.price = selectedResource.price;
    this.resourceDetailComponent.resourceType = selectedResource.resourceType;
    this.resourceDetailComponent.user = selectedResource.user;
    this.resourceDetailComponent.resourceTypeId = selectedResource.resourceType.id;
    this.resourceDetailComponent.userId = selectedResource.user.id;
    this.resourceDetailComponent.createdAt = selectedResource.createdAt;
    this.resourceDetailComponent.updatedAt = selectedResource.updatedAt;
    this.resourceDetailComponent.resourceFilesPath = selectedResource.resourceFilesPath;
    this.resourceDetailComponent.comments = selectedResource.comments;
    this.resourceDetailComponent.pageTitle = "Update";
    this.resourceDetailComponent.isVisible = true;
    this.resourceDetailComponent.currentUser = this.currentUser;

    selectedResource.clickCount++;
    this.resourceService.putResource(selectedResource.id, selectedResource)
        .subscribe({
          next: data => {
            this.messageService.create("success", "打开成功，点击次数加1");
          },
          error: error => {
            this.messageService.create("error", error.error);
          }
        });
  }

  refresh() {
    this.getResources();
  }
  
  onImageLoad(event: any) {
    if (event && event.target) {
      let gallery = document.querySelector('#gallery')!;
      var altura = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
      var gap = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-row-gap'));
      var item = event.target.parentElement.parentElement;
      item.style.gridRowEnd = "span " + Math.ceil((item.querySelector('.content').getBoundingClientRect().height + gap) / (altura + gap));
    }
  }

  onResize(event: any) {
    if (event && event.target) {
      let gallery = document.querySelector('#gallery')!;
      var altura = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
      var gap = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-row-gap'));
      gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        var el = <HTMLInputElement>item;
        el.style.gridRowEnd = "span " + Math.ceil((item.querySelector('.content')!.getBoundingClientRect().height + gap) / (altura + gap));
      });
    }
  }
}
