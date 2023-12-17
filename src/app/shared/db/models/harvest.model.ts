import { Model, DataTypes, Association, Sequelize } from 'sequelize';
import { Database } from '../helpers';
import { Category } from './categories.model';

/**
 * The Products model that maps the `products table` in the database.
 * The model name will be `products` also.
 */
export class Harvest extends Model {

  public Id!: number;
   public prices!: any;
   public title!: number;
  public quantity!: number;
  public unit!: number;
  public website!: number;
   public zipcode!: number;

  /**
   * Gets the category which the current product belongs to.
   * @summary An pre-declared possible inclusion that will only be populated if you actively include a relation.
   */
  // public readonly category?: Category;

  /**
   * An object hash from alias to association object
   */
  // public static readonly associations: {
  //   category: Association<Harvest, Category>;
  // };
}

/**
 * Define the model structure here.
 */

const sequelize = new Sequelize('harvest', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false /* Stop logging sql queries unless your are tracing some problems. */
});


Harvest.init(
  {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      prices: {
        type: DataTypes.NUMBER!,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(255), // Adjust the length as needed
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      unit: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      website: {
        type: DataTypes.STRING(255), // Adjust the length as needed
        allowNull: false
      },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  },
  
  {
    sequelize: sequelize,
    modelName: 'mytable' /* The model name & also the mapped database table name.  */,
    tableName: 'mytable',
    timestamps: false
  }
);