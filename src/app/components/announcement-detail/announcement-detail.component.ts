import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.scss']
})
export class AnnouncementDetailComponent implements OnInit {

  id!: number;
  title!: string;
  content!: string;
  isDisplay!: boolean;

  pageTitle!: string;
  pageTitleChinese!: string;
  isVisible!: boolean;

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(private announcementService: AnnouncementService, private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  close(): void {
    this.isVisible = false;
  }

  submit(): void {
    if (this.pageTitle == "Update") {
      this.announcementService.putAnnouncement(this.id, { id: this.id, title: this.title, content: this.content, isDisplay: this.isDisplay })
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
      this.announcementService.postAnnouncement({ id: 0, title: this.title, content: this.content, isDisplay: this.isDisplay })
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
