import {FoodTypeEntityDto} from './food-type-entity.dto';
import {FoodStallEntityDto} from './food-stall-entity.dto';

export class FoodEntityDto {
  public id: 25;
  public foodName: string;
  public originPrice: number;
  public retailPrice: number;
  public foodDescription: string;
  public foodType: FoodTypeEntityDto;
  public foodStall: FoodStallEntityDto;
  public foodRating: number;
  public foodImage: string;
  public isActive: boolean;
}
