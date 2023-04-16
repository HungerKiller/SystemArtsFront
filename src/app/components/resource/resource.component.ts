import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ResourceDetailComponent } from '../resource-detail/resource-detail.component';
import { ResourceService } from 'src/app/services/resource.service';
import { Resource } from 'src/app/models/Resource';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  @ViewChild(ResourceDetailComponent) resourceDetailComponent!: ResourceDetailComponent;
  resources!: Resource[];
  loading = true;
  currentUploadResourceId!: number;

  constructor(private resourceService: ResourceService, private messageService: NzMessageService) { }

  ngOnInit() {
    this.getResources();
  }

  getResources(): void {
    this.loading = true;
    this.resourceService.getResources()
      .subscribe({
        next: resources => {
          this.loading = false;
          this.resources = resources;
        }
      });
  }

  editResource(selectedResource: Resource): void {
    this.resourceDetailComponent.id = selectedResource.id;
    this.resourceDetailComponent.title = selectedResource.title;
    this.resourceDetailComponent.description = selectedResource.description;
    this.resourceDetailComponent.price = selectedResource.price;
    this.resourceDetailComponent.resourceType = selectedResource.resourceType;
    this.resourceDetailComponent.user = selectedResource.user;
    this.resourceDetailComponent.resourceTypeId = selectedResource.resourceType.id;
    this.resourceDetailComponent.userId = selectedResource.user.id;
    this.resourceDetailComponent.createdAt = selectedResource.createdAt;
    this.resourceDetailComponent.updatedAt = selectedResource.updatedAt;
    this.resourceDetailComponent.pageTitle = "Update";
    this.resourceDetailComponent.isVisible = true;
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

    this.resourceService.uploadResource(this.currentUploadResourceId, formData)
      .subscribe({
        next: data => {
          this.messageService.create("success", `File is uploaded successfully!`);
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

  downloadResource(resourceId: number): void {
    this.resourceService.downloadResource(resourceId)
      .subscribe({
        next: data => {
          this.messageService.create("success", `File is downloaded successfully!`);
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }
  
  createResource(): void {
    this.resourceDetailComponent.id = 0;
    this.resourceDetailComponent.pageTitle = "Create";
    this.resourceDetailComponent.isVisible = true;
  }

  deleteResource(resourceId: number): void {
    this.resourceService.deleteResource(resourceId)
      .subscribe({
        next: data => {
          this.messageService.create("success", "Delete succeed!");
          this.getResources();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.getResources();
  }
}
