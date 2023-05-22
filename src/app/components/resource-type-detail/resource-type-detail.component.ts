import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ResourceTypeService } from 'src/app/services/resource-type.service';

@Component({
  selector: 'app-resource-type-detail',
  templateUrl: './resource-type-detail.component.html',
  styleUrls: ['./resource-type-detail.component.scss']
})
export class ResourceTypeDetailComponent implements OnInit {

  id!: number;
  name!: string;
  description!: string;

  pageTitle!: string;
  pageTitleChinese!: string;
  isVisible!: boolean;

  @Output() isNeedRefresh = new EventEmitter<boolean>();

  constructor(private resourceTypeService: ResourceTypeService, private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  close(): void {
    this.isVisible = false;
  }

  submit(): void {
    if (this.pageTitle == "Update") {
      this.resourceTypeService.putResourceType(this.id, { id: this.id, name: this.name, description: this.description })
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
      this.resourceTypeService.postResourceType({ id: 0, name: this.name, description: this.description })
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
