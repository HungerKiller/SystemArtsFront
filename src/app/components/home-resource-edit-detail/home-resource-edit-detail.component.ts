import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import Utils from 'src/app/Helpers/Utils';
import { ApiRoute } from 'src/app/api-routes';
import { Comment } from 'src/app/models/Comment';
import { Resource } from 'src/app/models/Resource';
import { ResourceFile } from 'src/app/models/ResourceFile';
import { ResourceType } from 'src/app/models/ResourceType';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { ResourceFileService } from 'src/app/services/resource-file.service';
import { ResourceTypeService } from 'src/app/services/resource-type.service';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-home-resource-edit-detail',
  templateUrl: './home-resource-edit-detail.component.html',
  styleUrls: ['./home-resource-edit-detail.component.scss']
})
export class HomeResourceEditDetailComponent implements OnInit {

  resource: Resource | undefined;
  title!: string;
  description!: string;
  price!: number;
  clickCount!: number;
  resourceType: ResourceType | undefined;
  resourceTypeId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  resourceFiles!: ResourceFile[];
  comments!: Comment[];

  currentUser: User | undefined;
  resourceTypes!: ResourceType[];

  pageTitle!: string;
  pageTitleChinese!: string;
  isVisible!: boolean;

  // comments
  submitting = false;
  inputValue = '';

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(
    private resourceService: ResourceService,
    private resourceTypeService: ResourceTypeService,
    private resourceFileService: ResourceFileService,
    private commentService: CommentService,
    private messageService: NzMessageService) {
    this.getResourceTypes();
  }

  ngOnInit(): void {
  }

  getResourceTypes(): void {
    this.resourceTypeService.getResourceTypes()
      .subscribe({
        next: resourceTypes => {
          this.resourceTypes = resourceTypes;
          this.resourceType = resourceTypes[0];
          this.resourceTypeId = resourceTypes[0].id;
        }
      });
  }

  close(): void {
    this.isVisible = false;
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    this.commentService.postComment(new Comment(0, content, this.currentUser!, this.resource!.id))
        .subscribe({
          next: data => {
            this.messageService.create("success", "评论成功!");
            this.close();
            this.isNeedRefresh.emit();
          },
          error: error => {
            this.messageService.create("error", error.error);
          }
        });
  }

  submit(): void {
    if (this.pageTitle == "Update") {
      this.resourceService.putResource(this.resource!.id, new Resource(this.resource!.id, this.title, this.description, this.price, this.clickCount, this.resourceType!, this.currentUser!))
        .subscribe({
          next: data => {
            this.messageService.create("success", "更新成功!");
            this.close();
            this.isNeedRefresh.emit();
          },
          error: error => {
            this.messageService.create("error", error.error);
          }
        });
    }
    else if (this.pageTitle == "Create") {
      this.resourceService.postResource(new Resource(0, this.title, this.description, this.price, this.clickCount, this.resourceType!, this.currentUser!))
        .subscribe({
          next: data => {
            this.messageService.create("success", "创建成功!");
            this.close();
            this.isNeedRefresh.emit();
          },
          error: error => {
            this.messageService.create("error", error.error);
          }
        });
    }
  }

  validateResourceFile(resourceFile: ResourceFile) {
    resourceFile.isValid = true;
    this.resourceFileService.putResourceFile(resourceFile.id, resourceFile)
      .subscribe({
        next: data => {
          this.messageService.create("success", "资源文件通过审核!");
          this.isNeedRefresh.emit();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  invalidateResourceFile(resourceFile: ResourceFile) {
    resourceFile.isValid = false;
    this.resourceFileService.putResourceFile(resourceFile.id, resourceFile)
      .subscribe({
        next: data => {
          this.messageService.create("success", "资源文件重置为未通过审核!");
          this.isNeedRefresh.emit();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  downloadResourceFile(resourceFile: ResourceFile){
    this.resourceFileService.downloadResourceFile(resourceFile.id)
      .subscribe({
        next: (response: Blob) => {
          const downloadUrl = URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = resourceFile.name;
          link.click();
          URL.revokeObjectURL(downloadUrl);
          this.messageService.create("success", "下载成功!");
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  deleteResourceFile(resourceFile: ResourceFile){
    this.resourceFileService.deleteResourceFile(resourceFile.id)
      .subscribe({
        next: data => {
          this.messageService.create("success", "成功删除资源文件!");
          this.isNeedRefresh.emit();
          this.refresh();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.resourceService.getResource(this.resource?.id!)
      .subscribe({
        next: resource => {
          this.resource = resource;
          // Set resource file path
          resource.resourceFiles.map(f => f.pathWithHostUrl = `${ApiRoute.APPSERVICEHOST}/${f.name}`);
          this.resourceFiles = resource.resourceFiles;
        }
      });
  }

  isImage(name: string): boolean {
    return Utils.isImageFile(name);
  }

  isVideo(name: string): boolean {
    return Utils.isVideoFile(name);
  }
}