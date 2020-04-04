import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from '../../../../service/admin.service';
import {Subject} from 'rxjs';
import {AllFSManagerDto} from '../../../../dtos/allFSManager.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-fsm',
  templateUrl: './manage-fsm.component.html',
  styleUrls: ['./manage-fsm.component.css']
})
export class ManageFsmComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  fsms: AllFSManagerDto[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.adminService.getAllFSManager().subscribe(allFSM => {
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
    this.adminService.deleteCashier(id).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/fsm']);
    }); 
    }, error => {
      console.log(error);
    });
  }

}
