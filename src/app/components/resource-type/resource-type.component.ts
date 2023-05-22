import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ResourceType } from 'src/app/models/ResourceType';
import { ResourceTypeService } from 'src/app/services/resource-type.service';
import { ResourceTypeDetailComponent } from '../resource-type-detail/resource-type-detail.component';

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.scss']
})
export class ResourceTypeComponent implements OnInit {

  @ViewChild(ResourceTypeDetailComponent) resourceTypeDetailComponent!: ResourceTypeDetailComponent;
  resourceTypes!: ResourceType[];
  loading = true;

  constructor(private resourceTypeService: ResourceTypeService, private messageService: NzMessageService) { }

  ngOnInit() {
    this.getResourceTypes();
  }

  getResourceTypes(): void {
    this.loading = true;
    this.resourceTypeService.getResourceTypes()
    .subscribe({
      next: resourceTypes => { 
        this.loading = false; 
        this.resourceTypes = resourceTypes; 
      }});
  }

  editResourceType(selectedResourceType : ResourceType): void {
    this.resourceTypeDetailComponent.id = selectedResourceType.id;
    this.resourceTypeDetailComponent.name = selectedResourceType.name;
    this.resourceTypeDetailComponent.description = selectedResourceType.description;
    this.resourceTypeDetailComponent.pageTitle = "Update";
    this.resourceTypeDetailComponent.pageTitleChinese = "编辑";
    this.resourceTypeDetailComponent.isVisible = true;
  }

  createResourceType(): void {
    this.resourceTypeDetailComponent.id = 0;
    this.resourceTypeDetailComponent.pageTitle = "Create";
    this.resourceTypeDetailComponent.pageTitleChinese = "新建";
    this.resourceTypeDetailComponent.isVisible = true;
  }

  deleteResourceType(resourceTypeId: number): void {
    this.resourceTypeService.deleteResourceType(resourceTypeId)
      .subscribe({
        next: data => {
          this.messageService.create("success", "删除成功!");
          this.getResourceTypes();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.getResourceTypes();
  }
}
