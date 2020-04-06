import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../dtos/user.dto';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {FsmanagerService} from '../../../../service/fsmanager.service';
import {FoodEntityDto} from '../../../../dtos/food-entity.dto';
import {AuthenticationService} from '../../../../service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-manage-food',
  templateUrl: './manage-food.component.html',
  styleUrls: ['./manage-food.component.css']
})
export class ManageFoodComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  foods: FoodEntityDto[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  fsId: number;
  loading = false;

  constructor(private fsmanagerService: FsmanagerService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fsId = this.authenticationService.currentUserValue.foodStallId;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loading = true;
    this.fsmanagerService.getAllFood(this.fsId).subscribe(foods => {
      this.loading = false;
      this.foods = foods;
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

  onEdit(id: number) {
    this.router.navigate([`/fsmanager/food/edit/${id}`]);
  }

  onDelete(id: number) {
    if (confirm('Do you want to delete this Food?')) {
      this.loading = true;
      this.fsmanagerService.deleteFood(this.fsId, id).subscribe(data => {
        this.toastr.success('Delete food successfully');
        this.fsmanagerService.getAllFood(this.fsId).subscribe(foods => {
          this.loading = false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.foods = foods;
            this.dtTrigger.next();
          });
        });
      }, error => {
        // alert(error);
        this.toastr.error(error);
      });
    }
  }

}
