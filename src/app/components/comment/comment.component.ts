import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommentDetailComponent } from '../comment-detail/comment-detail.component';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @ViewChild(CommentDetailComponent) commentDetailComponent!: CommentDetailComponent;
  comments!: Comment[];
  loading = true;

  constructor(private commentService: CommentService, private messageService: NzMessageService) { }

  ngOnInit() {
    this.getComments();
  }

  getComments(): void {
    this.loading = true;
    this.commentService.getComments()
      .subscribe({
        next: comments => {
          this.loading = false;
          this.comments = comments;
        }
      });
  }

  editComment(selectedComment: Comment): void {
    this.commentDetailComponent.id = selectedComment.id;
    this.commentDetailComponent.content = selectedComment.content;
    this.commentDetailComponent.resource = selectedComment.resource;
    this.commentDetailComponent.user = selectedComment.user;
    this.commentDetailComponent.resourceId = selectedComment.resource.id;
    this.commentDetailComponent.userId = selectedComment.user.id;
    this.commentDetailComponent.createdAt = selectedComment.createdAt;
    this.commentDetailComponent.updatedAt = selectedComment.updatedAt;
    this.commentDetailComponent.pageTitle = "Update";
    this.commentDetailComponent.isVisible = true;
  }

  createComment(): void {
    this.commentDetailComponent.id = 0;
    this.commentDetailComponent.pageTitle = "Create";
    this.commentDetailComponent.isVisible = true;
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId)
      .subscribe({
        next: data => {
          this.messageService.create("success", "Delete succeed!");
          this.getComments();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.getComments();
  }
}
