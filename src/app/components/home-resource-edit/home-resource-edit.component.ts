import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ResourceService } from 'src/app/services/resource.service';
import { Resource } from 'src/app/models/Resource';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AuthService } from 'src/app/services/auth.service';
import { RoleEnum, User } from 'src/app/models/User';
import { ResourceFileService } from 'src/app/services/resource-file.service';
import { HomeResourceEditDetailComponent } from '../home-resource-edit-detail/home-resource-edit-detail.component';
import { ApiRoute } from 'src/app/api-routes';
import { ResourceFile } from 'src/app/models/ResourceFile';

@Component({
  selector: 'app-home-resource-edit',
  templateUrl: './home-resource-edit.component.html',
  styleUrls: ['./home-resource-edit.component.scss']
})
export class HomeResourceEditComponent implements OnInit {

  @ViewChild(HomeResourceEditDetailComponent) resourceDetailComponent!: HomeResourceEditDetailComponent;
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
            resource.resourceFiles.map(f => f.pathWithHostUrl = `${ApiRoute.APPSERVICEHOST}/${f.name}`);
          }
        }
      });
  }

  getResourcesByUser(userId: number): void {
    this.loading = true;
    this.resourceService.getResourcesByUserId(userId)
      .subscribe({
        next: resources => {
          this.loading = false;
          this.resources = resources;
          // Set resource file path
          for (let resource of resources) {
            resource.firstResouceFilePath = `${ApiRoute.APPSERVICEHOST}/${resource.resourceFiles[0]?.name}`;
            resource.resourceFiles.map(f => f.pathWithHostUrl = `${ApiRoute.APPSERVICEHOST}/${f.name}`);
          }
        }
      });
  }

  getResourcesByUserRole() {
    if (this.currentUser) {
      if (this.currentUser!.role == RoleEnum.ADMIN) {
        this.getResources();
      }
      else {
        this.getResourcesByUser(this.currentUser!.id);
      }
    }
    else {
      this.resources = [];
    }
  }

  getCurrentUser(): void {
    this.authService.currentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.getResourcesByUserRole();
      }
      else {
        this.currentUser = undefined;
      }
    });
  }

  createResource(): void {
    this.resourceDetailComponent.pageTitle = "Create";
    this.resourceDetailComponent.pageTitleChinese = "新建";
    this.resourceDetailComponent.isVisible = true;
    this.resourceDetailComponent.currentUser = this.currentUser;
  }

  editResource(selectedResource: Resource): void {
    this.resourceDetailComponent.resource = selectedResource;
    this.resourceDetailComponent.title = selectedResource.title;
    this.resourceDetailComponent.description = selectedResource.description;
    this.resourceDetailComponent.price = selectedResource.price;
    this.resourceDetailComponent.clickCount = selectedResource.clickCount;
    this.resourceDetailComponent.resourceType = selectedResource.resourceType;
    this.resourceDetailComponent.resourceTypeId = selectedResource.resourceType.id;
    this.resourceDetailComponent.createdAt = selectedResource.createdAt;
    this.resourceDetailComponent.updatedAt = selectedResource.updatedAt;
    this.resourceDetailComponent.resourceFiles = selectedResource.resourceFiles;
    this.resourceDetailComponent.comments = selectedResource.comments;
    this.resourceDetailComponent.pageTitle = "Update";
    this.resourceDetailComponent.pageTitleChinese = "编辑";
    this.resourceDetailComponent.isVisible = true;
    this.resourceDetailComponent.currentUser = this.currentUser;
  }

  // Solo upload
  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file) => {
      return formData.append('file', file, file.name);
    });

    this.resourceFileService.uploadResourceFile(this.currentUploadResourceId, formData)
      .subscribe({
        next: data => {
          this.messageService.create("success", `文件上传成功!`);
          this.refresh();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  uploadResource(resourceId: number) {
    this.currentUploadResourceId = resourceId;
    let upload = <HTMLInputElement>document.querySelector('#file-upload');
    upload.click();
  }

  // todo use resourceFileId
  downloadResource(resourceId: number): void {
    this.resourceFileService.downloadResourceFile(resourceId)
      .subscribe({
        next: data => {
          this.messageService.create("success", `File is downloaded successfully!`);
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  deleteResource(resourceId: number): void {
    this.resourceService.deleteResource(resourceId)
      .subscribe({
        next: data => {
          this.messageService.create("success", "删除成功!");
          this.getResourcesByUserRole();;
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.getResourcesByUserRole();
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
