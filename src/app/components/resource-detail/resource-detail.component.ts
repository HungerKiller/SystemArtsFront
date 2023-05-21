import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Resource } from 'src/app/models/Resource';
import { ResourceType } from 'src/app/models/ResourceType';
import { User } from 'src/app/models/User';
import { ResourceTypeService } from 'src/app/services/resource-type.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss']
})
export class ResourceDetailComponent implements OnInit {

  id!: number;
  title!: string;
  description!: string;
  price!: number;
  clickCount!: number;
  resourceType!: ResourceType;
  user!: User;
  createdAt!: Date;
  updatedAt!: Date;

  userId!: number;
  resourceTypeId!: number;

  resourceTypes!: ResourceType[];
  users!: User[];

  pageTitle!: string;
  isVisible!: boolean;

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(
    private resourceService: ResourceService,
    private resourceTypeService: ResourceTypeService,
    private userService: UserService,
    private messageService: NzMessageService) {
    this.getUsers();
    this.getResourceTypes();
  }

  ngOnInit(): void {
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe({
        next: users => {
          this.users = users;
          this.user = users[0];
          this.userId = users[0].id;
        }
      });
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

  submit(): void {
    if (this.pageTitle == "Update") {
      this.resourceService.putResource(this.id, new Resource(this.id, this.title, this.description, this.price, this.clickCount, this.resourceType, this.user))
        .subscribe({
          next: data => {
            this.messageService.create("success", "Update succeed!");
            this.close();
            this.isNeedRefresh.emit();
          },
          error: error => {
            this.messageService.create("error", error.error);
          }
        });
    }
    else if (this.pageTitle == "Create") {
      this.resourceService.postResource(new Resource(0, this.title, this.description, this.price, this.clickCount, this.resourceType, this.user))
        .subscribe({
          next: data => {
            this.messageService.create("success", "Create succeed!");
            this.close();
            this.isNeedRefresh.emit();
          },
          error: error => {
            this.messageService.create("error", error.error);
          }
        });
    }
  }
}
