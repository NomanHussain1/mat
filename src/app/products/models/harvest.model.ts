import { CategoryDTO } from '../../categories/models';

/**
 * Represents a data transfer object(DTO) for the product.
 *
 * @see for more information about DTO https://www.codeproject.com/Articles/1050468/Data-Transfer-Object-Design-Pattern-in-Csharp
 */
export interface HarvestDTO {

  id: number;
  prices: string;
  title: number;
  quantity: number;
  unit: number;
  website: number;
  zipcode: number;
  harvest: HarvestDTO;
}