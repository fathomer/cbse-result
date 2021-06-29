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

const defaultClass10: Class10And11[] = [
  { marksObtained: 50, subject: 'Mathematics', totalMarks: 80 },
  { marksObtained: 60, subject: 'Science', totalMarks: 80 },
  { marksObtained: 70, subject: 'Social Studies', totalMarks: 80 },
  { marksObtained: 80, subject: 'English', totalMarks: 80 },
  { marksObtained: 90, subject: 'Hindi', totalMarks: 80 },
];

const defaultClass11: Class10And11[] = [
  { marksObtained: 50, subject: 'Mathematics', totalMarks: 80 },
  { marksObtained: 60, subject: 'Accounts', totalMarks: 80 },
  { marksObtained: 70, subject: 'Business', totalMarks: 80 },
  { marksObtained: 80, subject: 'English', totalMarks: 80 },
  { marksObtained: 90, subject: 'Economics', totalMarks: 80 },
];

const defaultClass12: Class10And11[] = [
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
  dataSourceClass10 = [...defaultClass10];
  dataSourceClass11 = [...defaultClass11];
  dataSourceClass12 = [...defaultClass12];
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

  compareClass10(first: Class10And11, second: Class10And11): number {
    if (
      first.marksObtained / first.totalMarks <
      second.marksObtained / second.totalMarks
    ) {
      return 1;
    }
    if (
      first.marksObtained / first.totalMarks >
      second.marksObtained / second.totalMarks
    ) {
      return -1;
    } else return 0;
  }

  logIt(): any {
    console.log(this.getClass10Top3());
  }

  getClass10Top3(): number {
    if (this.dataSourceClass10 && this.dataSourceClass10.length >= 3) {
      let class10DataCopy = JSON.parse(JSON.stringify(this.dataSourceClass10));
      return (
        class10DataCopy
          .sort(this.compareClass10)
          .slice(0, 3)
          .map(
            (element: Class10And11) =>
              (100 * element.marksObtained) / element.totalMarks
          )
          .reduce((a: number, b: number) => a + b) * 0.3
      );
    }
    return -1;
  }

  addData(classNumber: number) {
    let randomElementIndex: any;
    switch (classNumber) {
      case 10:
        randomElementIndex = Math.floor(Math.random() * defaultClass10.length);
        this.dataSourceClass10.push(defaultClass10[randomElementIndex]);
        this.table10.renderRows();
        break;
      case 11:
        randomElementIndex = Math.floor(Math.random() * defaultClass11.length);
        this.dataSourceClass11.push(defaultClass11[randomElementIndex]);
        this.table11.renderRows();
        break;
      case 12:
        randomElementIndex = Math.floor(Math.random() * defaultClass12.length);
        this.dataSourceClass12.push(defaultClass12[randomElementIndex]);
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
