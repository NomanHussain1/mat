import { Model, DataTypes, Association, Sequelize } from 'sequelize';
import { Database } from '../helpers';
import { Category } from './categories.model';

/**
 * The Products model that maps the `products table` in the database.
 * The model name will be `products` also.
 */
export class userdata extends Model {

  public id!: number;
   public user_email!: string;
   public product_id!: number;
  public created_at!: Date;
  public updated_at!: Date; 

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


userdata.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_email: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
    },
    // Other options for the model go here
  
  
  
  {
    sequelize: sequelize,
    modelName: 'userdata' /* The model name & also the mapped database table name.  */,
    tableName: 'userdata',
    timestamps: false
  }
);