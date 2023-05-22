import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Comment } from 'src/app/models/Comment';
import { Resource } from 'src/app/models/Resource';
import { ResourceType } from 'src/app/models/ResourceType';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { ResourceTypeService } from 'src/app/services/resource-type.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss']
})
export class ResourceDetailComponent implements OnInit {

  resource: Resource | undefined;
  title!: string;
  description!: string;
  price!: number;
  clickCount!: number;
  resourceType: ResourceType | undefined;
  user: User | undefined;
  createdAt!: Date;
  updatedAt!: Date;
  comments!: Comment[];
  resourceFilesPath!: string[];
  currentUser: User | undefined;

  userId!: number;
  resourceTypeId!: number;

  resourceTypes!: ResourceType[];
  users!: User[];

  pageTitle!: string;
  isVisible!: boolean;

  // comments
  submitting = false;
  inputValue = '';

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(
    private resourceService: ResourceService,
    private resourceTypeService: ResourceTypeService,
    private userService: UserService,
    private commentService: CommentService,
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

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    this.commentService.postComment(new Comment(0, content, this.user!, this.resource!.id))
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

  submit(): void {
    if (this.pageTitle == "Update") {
      this.resourceService.putResource(this.resource!.id, new Resource(this.resource!.id, this.title, this.description, this.price, this.clickCount, this.resourceType!, this.user!))
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
      this.resourceService.postResource(new Resource(0, this.title, this.description, this.price, this.clickCount, this.resourceType!, this.user!))
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
