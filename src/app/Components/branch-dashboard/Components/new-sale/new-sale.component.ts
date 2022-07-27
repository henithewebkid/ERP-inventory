import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDatas } from 'src/app/Models/product.model';
import { ProductManageService } from 'src/app/Services/product-manage.service';
import { ReportsService } from 'src/app/Services/reports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css']
})
export class NewSaleComponent implements OnInit {

  valueForm!: FormGroup
  product: ProductDatas = {} as ProductDatas
  info!: FormGroup
  productData: any
  p: number = 1
  errors:any
  grandTotal !: number;

  constructor(private fb:FormBuilder,private productService: ProductManageService,private reportsService: ReportsService  ) { }

  ngOnInit(): void {
    this.getAllProducts()
    this.info = new FormGroup({
      'sale_report': new FormArray([])
    })
  }
  salesReports() : FormArray{
    return this.info.get("sale_report") as FormArray
  }
  newSalesReports(){

    this.valueForm = this.fb.group({
      productname: ['',Validators.required],
      productwidth: [0,Validators.required],
      productheight: [0,Validators.required],
      productthickness: [0,Validators.required],
      productamount: [0,Validators.required],
      productprice: [0,Validators.required],
      totalprice: [0,Validators.required]
    })
    
    this.valueForm.get('productamount')?.valueChanges.subscribe(val => {
      const newVal = this.valueForm.get('productamount')?.value * this.valueForm.get('productprice')?.value
      this.valueForm.controls.totalprice.patchValue(newVal)
      this.grandTotal = this.getTotalPrice()
    })
   
    return this.valueForm
  }
  changeValue() : number {
    let price = this.valueForm.get('totalprice')?.value
    this.info.get('sale_report')?.valueChanges.subscribe(val => {
      price = val.productamount * val.productprice
    })
    return price
  }
  onAddSales(row:any){
    this.salesReports().push(this.newSalesReports());
    this.valueForm.controls['productname'].setValue(row.productName)
    this.valueForm.controls['productwidth'].setValue(row.productWidth)
    this.valueForm.controls['productheight'].setValue(row.productHeight)
    this.valueForm.controls['productthickness'].setValue(row.productThickness)
    this.valueForm.controls['productprice'].setValue(row.productPrice * 1)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.info.get('sale_report')?.value.map((a:any)=>{
      grandTotal += a.totalprice;
    })
    return grandTotal;
  }
  getAllProducts(){
    this.productService.getAllProduct().subscribe(result => {
      if (result) {
        if (result.status === 200) {
         this.productData = JSON.parse(result.body)
        } else {
        }
      }
    },
      error => {
        console.log(error(String(error.error), "Error"));
      });

  }

  onDelete(i:number){
    this.salesReports().removeAt(i)
    this.grandTotal = this.getTotalPrice()
  }

  onSubmit(){
    const sale_report = this.info.value
    const TotalSales = this.grandTotal
    
    this.reportsService.newReport(sale_report,TotalSales).subscribe(result => {
      if(result){
        if(result.status==201){
          Swal.fire({
            icon: 'success',
            title: 'Sales Report Submitted Successfully',
            showConfirmButton: true
          })
          this.salesReports().clear()
          this.grandTotal = 0
        }
        else{
          this.errors=result;
          
        }
      }
    })
  }
  key: string = this.product.productName
  reverse: boolean = false
  sort(key:any){
    this.key =key
    this.reverse = !this.reverse
  }
}
