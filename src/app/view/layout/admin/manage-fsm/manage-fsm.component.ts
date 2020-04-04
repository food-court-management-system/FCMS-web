import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../../service/admin.service';
import {Subject} from 'rxjs';
import {AllFSManagerDto} from '../../../../dtos/allFSManager.dto';
import {DataTableDirective} from 'angular-datatables';

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

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.adminService.getAllFSManager().subscribe(allFSM => {
      console.log(allFSM);
      this.fsms = allFSM;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onDelete(id: number) {
    if (confirm('Do you want to delete this FS Manager?')) {
      this.adminService.deleteCashier(id).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
      this.adminService.getAllFSManager().subscribe(fsms => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.fsms = fsms;
          this.dtTrigger.next();
        });
      });
    }
  }

}
