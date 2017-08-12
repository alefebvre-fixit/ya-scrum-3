import { Component, OnInit, Input, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Chart } from 'chart.js';

import { Story, StoryProgress } from '../../models';
import { StoryService } from '../../services';

@Component({
  selector: 'sprint-story-card',
  templateUrl: './sprint-story-card.component.html',
  styleUrls: ['./sprint-story-card.component.scss']
})
export class SprintStoryCardComponent implements OnInit, OnChanges {


  @Input() story: Story;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  private progress: StoryProgress;
  private percentage: String = '-';

  doughnutChart: any;

  constructor(
    private router: Router,
    private storyService: StoryService,
  ) {

    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });
  }

  ngOnInit(): void {
    this.progress = Story.getLatestProgress(this.story);
    this.percentage = StoryProgress.progressAsPercentage(this.progress) + '%';
    this.initChart(this.progress);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.progress = Story.getLatestProgress(this.story);
    this.percentage = StoryProgress.progressAsPercentage(this.progress) + '%';
  }

  private initChart(progress: StoryProgress) {

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: [
          'previous',
          'daily',
          'remaining'
        ],
        datasets: [{
          data: [progress.previous, progress.daily, progress.remaining],
          backgroundColor: ['#15B7B9', '#10DDC2', '#F5F5F5'],
          hoverBackgroundColor: ['#15B7B9', '#10DDC2', '#F5F5F5']
        }]
      },
      options: {
        cutoutPercentage: 85,
        legend: false,

        elements: {
          center: {
            text: this.percentage,
            color: '#15B7B9', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 50 // Defualt is 20 (as a percentage)
          }
        }
      }
    }
    );
  }

  public add() {

    this.progress = this.storyService.incrementDailyProgress(this.story, this.progress, +1);
    this.storyService.assignDailyProgress(this.story, this.progress);
    this.storyService.save(this.story);

  }

  public remove() {
    this.progress = this.storyService.incrementDailyProgress(this.story, this.progress, -1);
    this.storyService.assignDailyProgress(this.story, this.progress);
    this.storyService.save(this.story);
  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/stories/${id}`]);
  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }

}
