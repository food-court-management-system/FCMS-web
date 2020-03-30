import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from '../../../../service/admin.service';
import {User} from '../../../../dtos/user.dto';
import {Subject} from 'rxjs';
import {FoodStallDto} from '../../../../dtos/foodStall.dto';

@Component({
  selector: 'app-manage-fs',
  templateUrl: './manage-fs.component.html',
  styleUrls: ['./manage-fs.component.css']
})
export class ManageFsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  fss: FoodStallDto[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.adminService.getAllFS().subscribe(data => {
      this.fss = data;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
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
    // this.adminService.deleteCashier(id).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });
    // this.adminService.getAllCashier().subscribe(users => {
    //   console.log(users);
    //   this.users = users;
    //   // Calling the DT trigger to manually render the table
    //   this.dtTrigger.next();
    // });
  }

}
