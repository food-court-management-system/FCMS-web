import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../../service/admin.service';
import {User} from '../../../../dtos/user.dto';
import {Subject} from 'rxjs';
import {FoodStallDto} from '../../../../dtos/foodStall.dto';
import {DataTableDirective} from 'angular-datatables';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-manage-fs',
  templateUrl: './manage-fs.component.html',
  styleUrls: ['./manage-fs.component.css']
})
export class ManageFsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  fss: FoodStallDto[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  loading = false;

  constructor(private adminService: AdminService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loading = true;
    this.adminService.getAllFS().subscribe(data => {
      this.loading = false;
      this.fss = data;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    }, error => {
      this.toastr.error(error);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // private extractData(res: Response) {
  //   const body = res.json();
  //   return body.data || {};
  // }

  onDelete(id: number) {
    if (confirm('Delete Food Stall will disable all the FS Manager and FS Staff account. Are you sure?')) {
      this.loading = true;
      this.adminService.deleteFS(id).subscribe(data => {
        this.toastr.success('Delete FS successfully');
        this.adminService.getAllFS().subscribe(fss => {
          this.loading = false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.fss = fss;
            this.dtTrigger.next();
          });
        }, error => {
          this.toastr.error(error);
        });
      }, error => {
        // console.log(error);
        this.toastr.error(error);
      });
    }
  }

}
