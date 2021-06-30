import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import swal from 'sweetalert2';

export interface Class10And11 {
  subject: string;
  marksObtained: number | null;
  totalMarks: number;
}

export interface Class12 {
  subject: string;
  theoryMarksObtained: number | null;
  practicalMarksObtained: number | null;
  theoryTotalMarks: number;
  practicalTotalMarks: number;
}

const defaultClass10: Class10And11[] = [
  { marksObtained: 71, subject: 'Mathematics', totalMarks: 80 },
  { marksObtained: 59, subject: 'Science', totalMarks: 80 },
  { marksObtained: 40, subject: 'Social Studies', totalMarks: 80 },
  { marksObtained: 61, subject: 'English', totalMarks: 80 },
  { marksObtained: 48, subject: 'Hindi', totalMarks: 80 },
];

const defaultClass11: Class10And11[] = [
  { marksObtained: 43, subject: 'Mathematics', totalMarks: 80 },
  { marksObtained: 59, subject: 'Accounts', totalMarks: 80 },
  { marksObtained: 42.5, subject: 'Business', totalMarks: 80 },
  { marksObtained: 47.5, subject: 'English', totalMarks: 80 },
  { marksObtained: 37, subject: 'Economics', totalMarks: 80 },
];

const defaultClass12: Class12[] = [
  {
    theoryMarksObtained: 37,
    subject: 'Mathematics',
    theoryTotalMarks: 100,
    practicalMarksObtained: 20,
    practicalTotalMarks: 20,
  },
  {
    theoryMarksObtained: 34.5,
    subject: 'Science',
    theoryTotalMarks: 100,
    practicalMarksObtained: 20,
    practicalTotalMarks: 20,
  },
  {
    theoryMarksObtained: 33,
    subject: 'Social Studies',
    theoryTotalMarks: 100,
    practicalMarksObtained: 20,
    practicalTotalMarks: 20,
  },
  {
    theoryMarksObtained: 36.5,
    subject: 'English',
    theoryTotalMarks: 100,
    practicalMarksObtained: 20,
    practicalTotalMarks: 20,
  },
  {
    theoryMarksObtained: 29,
    subject: 'Hindi',
    theoryTotalMarks: 100,
    practicalMarksObtained: 20,
    practicalTotalMarks: 20,
  },
];

@Component({
  selector: 'app-cbse-result',
  templateUrl: './cbse-result.component.html',
  styleUrls: ['./cbse-result.component.css'],
})
export class CbseResultComponent implements OnInit {
  displayedColumns: string[] = ['subject', 'marksObtained', 'totalMarks'];
  displayedColumns12: string[] = [
    'subject',
    'theoryMarksObtained',
    'theoryTotalMarks',
    'practicalMarksObtained',
    'practicalTotalMarks',
  ];
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

  compareClass10(first: Class10And11, second: Class10And11): number | null {
    if (!first.marksObtained || !second.marksObtained) {
      console.log('');
      return null;
    } else {
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
  }

  checkIfMarksNull(): boolean {
    for (let subject of this.dataSourceClass10) {
      if (!subject.subject || !subject.marksObtained || !subject.totalMarks) {
        swal.fire({
          title: 'Error!',
          icon: 'error',
          text: subject.subject
            ? 'Marks not entered for Class X ' + subject.subject + ' Subject '
            : 'Subject not entered for class X',
        });
        return false;
      }
    }

    for (let subject of this.dataSourceClass11) {
      if (!subject.subject || !subject.marksObtained || !subject.totalMarks) {
        swal.fire({
          title: 'Error!',
          icon: 'error',
          text: subject.subject
            ? 'Marks not entered for Class XI ' + subject.subject + ' Subject '
            : 'Subject not entered for class XI',
        });
        return false;
      }
    }

    for (let subject of this.getdataSourceClass12()) {
      if (
        !subject.subject ||
        !subject.practicalMarksObtained ||
        !subject.practicalTotalMarks ||
        !subject.theoryMarksObtained ||
        !subject.theoryTotalMarks
      ) {
        swal.fire({
          title: 'Error!',
          icon: 'error',
          text: subject.subject
            ? 'Marks not entered for Class XII ' + subject.subject + ' Subject '
            : 'Subject not entered for class XII',
        });
        return false;
      }
    }
    return true;
  }

  logIt(): any {
    if (this.checkIfMarksNull()) {
      console.log(this.getClass10Top3());
    }
  }

  getResult() {
    if (this.checkIfMarksNull()) {
      var class10marks = this.getClass10Top3();

      var finalMarksList = [];

      for (var index in this.dataSourceClass11) {
        finalMarksList.push(
          this.getMarksForOneSubject(
            this.dataSourceClass12[index],
            this.dataSourceClass11[index],
            class10marks
          )
        );
      }

      swal.fire({
        title: 'RESULT'
        ,icon: 'success',
        text:'You will get around ' + (finalMarksList.reduce((a,b)=>a+b)/finalMarksList.length).toFixed(2) + '%. Congrats.'
      })

    }
  }

  getMarksForOneSubject(
    class12: Class12,
    class11: Class10And11,
    class10: number
  ) {
    var finalTheoryMarks =
      ((100 * class12.theoryMarksObtained!) / class12.theoryTotalMarks) * 0.4 +
      ((100 * class11.marksObtained!) / class11.totalMarks) * 0.3 +
      class10;

    var normalizedTheory =
      ((100 - class12.practicalTotalMarks) * finalTheoryMarks) / 100;

    return normalizedTheory + class12.practicalMarksObtained!;
  }

  getClass10Top3(): number {
    if (this.dataSourceClass10 && this.dataSourceClass10.length >= 3) {
      let class10DataCopy = JSON.parse(JSON.stringify(this.dataSourceClass10));
      let class10DataCopy2 = JSON.parse(JSON.stringify(this.dataSourceClass10));

      console.log(class10DataCopy2
        .sort(this.compareClass10)
          .slice(0, 3)
          .map((element: Class10And11) =>
            (100 * element.marksObtained!) / element.totalMarks))

      return (
        class10DataCopy
          .sort(this.compareClass10)
          .slice(0, 3)
          .map((element: Class10And11) =>
            (100 * element.marksObtained!) / element.totalMarks)
          .reduce((a: number, b: number) => a + b) * 0.1
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

  getdataSourceClass12() {
    let subjectList = this.dataSourceClass11.map((a) => a.subject);
    for (var index in this.dataSourceClass12) {
      this.dataSourceClass12[index].subject = subjectList[index];
    }
    return this.dataSourceClass12;
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
