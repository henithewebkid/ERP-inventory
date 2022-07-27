import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  isPopupOpened = true
  reportData: any
  singleData: any

  constructor(private dialog: MatDialog,private reportsService: ReportsService ) { }

  ngOnInit(): void {
   this.getAllHistory()
  }
  getAllHistory(){
    this.reportsService.getHistory().subscribe(result => {
      if (result) {
        if (result.status === 200) {
         this.reportData = JSON.parse(result.body)
        } else {
        }
      }
    },
      error => {
        console.log(error(String(error.error), "Error"));
      });
  }
  onViewHistory(viewHistoryRef:any,row:any){
    this.singleData = row
    const dialogRef = this.dialog.open(viewHistoryRef, {
      data: {},
      height: '72%',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
}
