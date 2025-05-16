import { NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auto-slider',
  imports: [NgFor,RouterLink],
  templateUrl: './auto-slider.component.html',
  styleUrls: ['./auto-slider.component.css']
})
export class AutoSliderComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/slider1.jpg',
    'assets/slider2.png',
    'assets/slider3.jpg'
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  stopAutoSlide(): void {
    clearInterval(this.intervalId);
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToImage(index: number): void {
    this.currentIndex = index;
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }
}
