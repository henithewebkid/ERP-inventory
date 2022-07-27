import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportsService } from 'src/app/Services/reports.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{

  term!: any
  isPopupOpened = true
  reportData: any
  singleData: any
  user: any
  p: number = 1

  constructor(private dialog: MatDialog,private reportsService: ReportsService, private router:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.user = this.router.snapshot.params.name
    this.getAllHistory()
  }
  getAllHistory(){
    this.reportsService.getAllHistory(this.user).subscribe(result => {
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
