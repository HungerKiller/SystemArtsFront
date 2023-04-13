import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Announcement } from 'src/app/models/Announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AnnouncementDetailComponent } from '../announcement-detail/announcement-detail.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  @ViewChild(AnnouncementDetailComponent) announcementDetailComponent!: AnnouncementDetailComponent;
  announcements!: Announcement[];
  loading = true;

  constructor(private announcementService: AnnouncementService, private messageService: NzMessageService) { }

  ngOnInit() {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.loading = true;
    this.announcementService.getAnnouncements()
    .subscribe({
      next: announcements => { 
        this.loading = false; 
        this.announcements = announcements; 
      }});
  }

  editAnnouncement(selectedAnnouncement : Announcement): void {
    this.announcementDetailComponent.id = selectedAnnouncement.id;
    this.announcementDetailComponent.title = selectedAnnouncement.title;
    this.announcementDetailComponent.content = selectedAnnouncement.content;
    this.announcementDetailComponent.isDisplay = selectedAnnouncement.isDisplay;
    this.announcementDetailComponent.pageTitle = "Update";
    this.announcementDetailComponent.isVisible = true;
  }

  createAnnouncement(): void {
    this.announcementDetailComponent.id = 0;
    this.announcementDetailComponent.pageTitle = "Create";
    this.announcementDetailComponent.isVisible = true;
  }

  deleteAnnouncement(announcementId: number): void {
    this.announcementService.deleteAnnouncement(announcementId)
      .subscribe({
        next: data => {
          this.messageService.create("success", "Delete succeed!");
          this.getAnnouncements();
        },
        error: error => {
          this.messageService.create("error", error.error);
        }
      });
  }

  refresh() {
    this.getAnnouncements();
  }
}
