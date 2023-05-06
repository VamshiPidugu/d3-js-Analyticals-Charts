import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css'],
})
export class MultiselectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  links = [
    { source: 'energy', target: 'cutting', value: 30 },
    { source: 'energy', target: 'moulding', value: 15 },
    { source: 'energy', target: 'packaging', value: 15 },
    { source: 'energy', target: 'pressing', value: 20 },
    { source: 'energy', target: 'painting', value: 10 },
    { source: 'resource', target: 'cutting', value: 10 },
    { source: 'resource', target: 'moulding', value: 10 },
    { source: 'resource', target: 'pressing', value: 5 },
    { source: 'resource', target: 'painting', value: 10 },
    { source: 'cutting', target: 'product1', value: 20 },
    { source: 'cutting', target: 'product2', value: 20 },
    { source: 'moulding', target: 'product1', value: 10 },
    { source: 'moulding', target: 'product3', value: 15 },
    { source: 'packaging', target: 'product1', value: 3.75 },
    { source: 'packaging', target: 'product3', value: 3.75 },
    { source: 'packaging', target: 'product2', value: 7.5 },
    { source: 'pressing', target: 'product1', value: 5 },
    { source: 'pressing', target: 'product2', value: 20 },
    { source: 'painting', target: 'product1', value: 5 },
    { source: 'painting', target: 'product2', value: 10 },
    { source: 'painting', target: 'product3', value: 5 },
  ];

  // sources = Array.from(new Set(this.links.map(link => link.target)));
  // selectedSources = [];

  sources = Array.from(new Set(this.links.map((link) => link.target))).map(
    (source) => ({ value: source, selected: false })
  );

  selectedSources: string[] = [];
  parentLink = '';
  // get filteredLinks() {
  //   return this.links.filter((link) =>
  //     this.selectedSources.includes(link.source)
  //   );
  // }

  // updateSelectedSources(source: { value: string; selected: boolean }) {
  //   if (source.selected) {
  //     this.selectedSources.push(source.value);
  //   } else {
  //     this.selectedSources = this.selectedSources.filter(
  //       (selectedSource) => selectedSource !== source.value
  //     );
  //   }
  //}
  get filteredLinks() {
    return this.links.filter((link) => {
      return (
        this.selectedSources.includes(link.source) ||
        this.selectedSources.includes(link.target)
      );
    });
  }

  updateSelectedSources(source: { value: string; selected: boolean }) {
    if (source.selected) {
      this.selectedSources.push(source.value);
    } else {
      this.selectedSources = this.selectedSources.filter(
        (selectedSource) => selectedSource !== source.value
      );
    }
    this.updateParentLink();
  }

  updateParentLink() {
    this.parentLink = '';
    for (const selectedSource of this.selectedSources) {
      const parentLink = this.links.find(
        (link) => link.target === selectedSource
      );
      if (parentLink) {
        this.parentLink = `${parentLink.source} -> ${parentLink.target}`;
        break;
      }
    }
  }
}
