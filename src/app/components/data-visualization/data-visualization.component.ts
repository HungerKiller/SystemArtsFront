import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiRoute } from 'src/app/api-routes';
import { Resource } from 'src/app/models/Resource';
import { ResourceService } from 'src/app/services/resource.service';

import * as echarts from 'echarts';
import { ResourceTypeService } from 'src/app/services/resource-type.service';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.scss']
})
export class DataVisualizationComponent implements OnInit, OnChanges {

  resources!: Resource[];
  xData!: string[];
  yData!: number[];
  optionClickCount!: echarts.EChartsOption;

  data!: any[];
  optionType!: echarts.EChartsOption;

  constructor(
    private resourceService: ResourceService,
    private resourceTypeService: ResourceTypeService) { }

  ngOnInit() {
    this.getResources();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.buildOption();
  }

  getResources(): void {
    this.resourceService.getResources()
      .subscribe({
        next: resources => {
          this.resources = resources;
          this.xData = [];
          this.yData = [];
          for (let resource of resources) {
            // resource.firstResouceFilePath = `${ApiRoute.APPSERVICEHOST}/${resource.resourceFiles[0]?.name}`;
            // resource.resourceFilesPath = [];
            // resource.resourceFiles.map(f => resource.resourceFilesPath.push(`${ApiRoute.APPSERVICEHOST}/${f.name}`));

            this.xData.push(resource.title);
            this.yData.push(resource.clickCount);

            this.buildOption_clickCount();
            this.buildOption();

            this.resourceTypeService.getResourceTypes()
              .subscribe({
                next: types => {
                  this.data = [];
                  for (let type of types) {
                    let res = resources.filter(r => r.resourceType.id == type.id);
                    this.data.push({ value: res.length, name: type.name });
                  }

                  this.buildOption_type();
                }
              });

          }
        }
      });
  }

  buildOption_clickCount(): void {
    this.optionClickCount = {
      title: {
        text: '统计',
        subtext: '资源点击次数'
      },
      xAxis: {
        type: 'category',
        data: this.xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.yData,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          }
        }
      ]
    };
  }

  buildOption_type(): void {
    this.optionType = {
      title: {
        text: '统计',
        subtext: '按资源类型统计资源数量',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  buildOption(): void {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      title: {
        text: 'todo',
        subtext: 'todo'
      },
      xAxis: {
        type: 'category',
        data: this.xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.yData,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }
}
