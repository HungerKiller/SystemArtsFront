import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Resource } from 'src/app/models/Resource';
import { User } from 'src/app/models/User';
import { Comment } from 'src/app/models/Comment';
import { CommentService } from 'src/app/services/comment.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit {

  id!: number;
  content!: string;
  resource!: Resource;
  user!: User;
  createdAt!: Date;
  updatedAt!: Date;

  userId!: number;
  resourceId!: number;

  resources!: Resource[];
  users!: User[];

  pageTitle!: string;
  pageTitleChinese!: string;
  isVisible!: boolean;

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(
    private resourceService: ResourceService,
    private userService: UserService,
    private commentService: CommentService,
    private messageService: NzMessageService) {
    this.getUsers();
    this.getResources();
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

  getResources(): void {
    this.resourceService.getResources()
      .subscribe({
        next: resources => {
          this.resources = resources;
          this.resource = resources[0];
          this.resourceId = resources[0].id;
        }
      });
  }

  close(): void {
    this.isVisible = false;
  }

  submit(): void {
    if (this.pageTitle == "Update") {
      this.commentService.putComment(this.id, new Comment(this.id, this.content, this.user, this.resourceId))
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
      this.commentService.postComment(new Comment(0, this.content, this.user, this.resourceId))
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
}
