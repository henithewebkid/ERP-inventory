import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductManageService } from 'src/app/Services/product-manage.service';
import { ProductDatas } from 'src/app/Models/product.model'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  term!: any
  productData: any
  productForm!: FormGroup
  product: ProductDatas = {} as ProductDatas 
  isPopupOpened = true
  errors:any
  p: number = 1

  constructor(private dialog: MatDialog, private productService: ProductManageService) { }

  ngOnInit(): void {
    this.getAllProducts()
    this.productForm = new FormGroup({
      'id': new FormControl(null),
      'productname': new FormControl(null,Validators.required),
      'productwidth': new FormControl(null,Validators.required),
      'productheight': new FormControl(null,Validators.required),
      'productthickness': new FormControl(null,Validators.required),
      'productprice': new FormControl(null,Validators.required)
      
    })
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
  onAddProduct(addProductRef:any){
    const dialogRef = this.dialog.open(addProductRef, {
      data: {},
      height: '72%',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
  onUpdateProduct(updateProductRef:any,row:any){
    this.productForm.controls['id'].setValue(row._id)
    this.productForm.controls['productname'].setValue(row.productName)
    this.productForm.controls['productwidth'].setValue(row.productWidth)
    this.productForm.controls['productheight'].setValue(row.productHeight)
    this.productForm.controls['productthickness'].setValue(row.productThickness)
    this.productForm.controls['productprice'].setValue(row.productPrice)
    const dialogRef = this.dialog.open(updateProductRef, {
      data: {},
      height: '72%',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
  onDeleteProduct(deleteProductRef:any,row:any){
    this.productForm.controls['id'].setValue(row._id)
    const dialogRef = this.dialog.open(deleteProductRef, {
      data: {},
      height: '25%',
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
  addNewProducts(){
    const {productname,productwidth,productheight,productthickness,productprice} = this.productForm.value
    this.productService.createProduct(productname,productwidth,productheight,productthickness,productprice).subscribe(result => {
      if(result){
        if(result.status==201){
          Swal.fire({
            icon: 'success',
            title: 'Product strored Successfully',
            showConfirmButton: true
          })
          this.productForm.reset()
          this.getAllProducts()
          this.dialog.closeAll() 
        }
        else{
          this.errors=result;
          
        }
      }
    })
    
  }
  updateProducts(){
    this.product._id =this.productForm.get('id')?.value
    this.product.productName =this.productForm.get('productname')?.value
    this.product.productWidth =this.productForm.get('productwidth')?.value
    this.product.productHeight =this.productForm.get('productheight')?.value
    this.product.productThickness =this.productForm.get('productthickness')?.value
    this.product.productPrice =this.productForm.get('productprice')?.value
    this.productService.updateProduct(this.product._id,this.product).subscribe(result => {
      if (result) {
        if (result.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Product Updated Successfully',
            showConfirmButton: true
          })
         this.getAllProducts()
         this.dialog.closeAll()
        } else {
        }
      }
    },
      error => {
        console.log(error(String(error.error), "Error"));
      })
}
  onDelete(){
    const id = this.productForm.get('id')?.value
    this.productService.deleteProduct(id).subscribe(result => {
      if (result) {
        if (result.status === 200) {
         this.getAllProducts()
         this.dialog.closeAll()
        } else {
        }
      }
    },
      error => {
        console.log(error(String(error.error), "Error"));
      });
  }
  onCancle(){
  this.dialog.closeAll()
 }
  key: string = this.product.productName
  reverse: boolean = false
  sort(key:any){
    this.key =key
    this.reverse = !this.reverse
  }
}
