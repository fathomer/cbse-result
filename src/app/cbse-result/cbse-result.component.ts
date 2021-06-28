import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';

export interface Class10And11 {
  subject: string;
  marksObtained: number;
  totalMarks: number;
}

export interface Class12 {
  subject: string;
  theoryMarksObtained: number;
  practicalMarksObtained: number;
  theoryTotalMarks: number;
  practicalTotalMarks: number;
}

const ELEMENT_DATA: Class10And11[] = [
  { marksObtained: 50, subject: 'Mathematics', totalMarks: 80 },
  { marksObtained: 60, subject: 'Science', totalMarks: 80 },
  { marksObtained: 70, subject: 'Social Studies', totalMarks: 80 },
  { marksObtained: 80, subject: 'English', totalMarks: 80 },
  { marksObtained: 90, subject: 'Hindi', totalMarks: 80 },
];

@Component({
  selector: 'app-cbse-result',
  templateUrl: './cbse-result.component.html',
  styleUrls: ['./cbse-result.component.css'],
})
export class CbseResultComponent implements OnInit {
  displayedColumns: string[] = ['subject', 'marksObtained', 'totalMarks'];
  dataSourceClass10 = [...ELEMENT_DATA];
  dataSourceClass11 = [...ELEMENT_DATA];
  dataSourceClass12 = [...ELEMENT_DATA];
  class10Data!: Class10And11;
  class11Data!: Class10And11;
  class12Data!: Class12;

  @ViewChild('table10')
  table10!: MatTable<Class10And11>;

  @ViewChild('table11')
  table11!: MatTable<Class10And11>;

  @ViewChild('table12')
  table12!: MatTable<Class12>;
  isLinear = false;
  class10FormGroup = new FormGroup({});
  class11FormGroup = new FormGroup({});
  class12FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.class10FormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.class11FormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.class12FormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  addData(classNumber: number) {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    switch (classNumber) {
      case 10:
        this.dataSourceClass10.push(ELEMENT_DATA[randomElementIndex]);
        this.table10.renderRows();
        break;
      case 11:
        this.dataSourceClass11.push(ELEMENT_DATA[randomElementIndex]);
        this.table11.renderRows();
        break;
      case 12:
        this.dataSourceClass12.push(ELEMENT_DATA[randomElementIndex]);
        this.table12.renderRows();
        break;
    }
  }

  removeData(classNumber: number) {
    switch (classNumber) {
      case 10:
        this.dataSourceClass10.pop();
        this.table10.renderRows();
        break;
      case 11:
        this.dataSourceClass11.pop();
        this.table11.renderRows();
        break;
      case 12:
        this.dataSourceClass12.pop();
        this.table12.renderRows();
        break;
    }
  }
}
