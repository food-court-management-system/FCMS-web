import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FsmanagerService} from '../../../../service/fsmanager.service';
import {Subject} from 'rxjs';
import {User} from '../../../../dtos/user.dto';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-manage-fss',
  templateUrl: './manage-fss.component.html',
  styleUrls: ['./manage-fss.component.css']
})
export class ManageFssComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  users: User[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private fsmanagerService: FsmanagerService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.fsmanagerService.getAllFSS().subscribe(users => {
      this.users = users;
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
    if (confirm('Do you want to delete this staff?')) {
      this.fsmanagerService.deleteFSS(id).subscribe(data => {
        this.fsmanagerService.getAllFSS().subscribe(users => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.users = users;
            this.dtTrigger.next();
          });
        });
      }, error => {
        alert(error);
      });
    }
  }

}
