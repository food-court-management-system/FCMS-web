import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../../service/admin.service';
import {Subject} from 'rxjs';
import {AllFSManagerDto} from '../../../../dtos/allFSManager.dto';
import {DataTableDirective} from 'angular-datatables';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-manage-fsm',
  templateUrl: './manage-fsm.component.html',
  styleUrls: ['./manage-fsm.component.css']
})
export class ManageFsmComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  fsms: AllFSManagerDto[] = [];
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
    this.adminService.getAllFSManager().subscribe(allFSM => {
      this.loading = false;
      console.log(allFSM);
      this.fsms = allFSM;
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

  onDelete(id: number) {
    if (confirm('Do you want to delete this FS Manager?')) {
      this.loading = true;
      this.adminService.deleteCashier(id).subscribe(data => {
        this.toastr.success('Delete FSM successfully');
        this.adminService.getAllFSManager().subscribe(fsms => {
          this.loading = false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.fsms = fsms;
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
