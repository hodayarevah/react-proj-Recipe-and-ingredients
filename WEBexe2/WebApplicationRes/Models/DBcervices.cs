using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
using System.Text;
using WebApplicationRes;
using System.Threading;
using WebApplicationRes.Models;


/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{
    public SqlDataAdapter da;
    public DataTable dt;

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }


    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }

    //--------------------------------------------------------------------------------------------------
    // This method inserts a to the table 


    //----------------------------------------------------------------------------------------------\
  
    public int addIngredient(Ingredient ingredient)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommand(ingredient);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {


            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    public List<Ingredient> getIngredient()
    {
        SqlConnection con = null;

        try
        {

            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select * from Ingredients";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Ingredient> list = new List<Ingredient>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                Ingredient ingredient = new Ingredient();
                ingredient.Id = (int)dr["id"];
                ingredient.Name = (string)dr["name"];
                ingredient.Image = (string)dr["image"];
                ingredient.Calories = (int)dr["calories"];
                list.Add(ingredient);

            }

            return list;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }


    }
    public void addDishRecipe(DishRecipe dish)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommand(dish);      // add tour ang getId of tour

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            Int32 recipeId = Convert.ToInt32(cmd.ExecuteScalar()); // execute the command


            for (int i = 0; i < dish.Ingredients.Length; i++)
            {
                try
                {
                    cStr = BuildInsertCommand(recipeId, dish.Ingredients[i].Id);
                    cmd = CreateCommand(cStr, con);      // create the command
                    cmd.ExecuteNonQuery(); // execute the command

                }
                catch (Exception ex)
                {
                    throw (ex);
                }
            }



        }
        catch (Exception ex)
        {

            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    public List<DishRecipe> getDishRecipe()
    {
        SqlConnection con = null;
        SqlConnection con2 = null;

        try
        {

            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select * from Recipes";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlCommand cmd2;
            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            SqlDataReader dr2; // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end



            List<DishRecipe> list = new List<DishRecipe>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                DishRecipe d = new DishRecipe();
                d.Id = (int)dr["id"];
                d.Name = (string)dr["name"];
                d.Image = (string)dr["image"];
                d.Time = (int)dr["time"];
                d.CookingMethod = (string)dr["CookingMethod"];


                list.Add(d);
            }
            con.Close();
            cmd.Connection.Close();

            foreach (DishRecipe item in list)
            {

                con2 = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file


                selectSTR = "select I.name , I.calories , I.id , I.image from IngredientsRecipes as IR join Recipes as R on IR.recipeId=R.id join ingredients as I on I.ID=IR.ingredientId where IR.recipeId =" + item.Id;
                cmd2 = new SqlCommand(selectSTR, con2);

                dr2 = cmd2.ExecuteReader(CommandBehavior.CloseConnection);


                List<Ingredient> list2 = new List<Ingredient>();



                while (dr2.Read())
                {
                    Ingredient ing = new Ingredient();
                    ing.Id = (int)dr2["id"];
                    ing.Name = (string)dr2["name"];
                    ing.Image = (string)dr2["image"];
                    ing.Calories = (int)dr2["calories"];
                    list2.Add(ing);

                }

                cmd2.Connection.Close();
                con2.Close();
                cmd.Connection.Close();
                con.Close();
                item.Ingredients = list2.ToArray();
            }

            return list;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
                con2.Close();

            }

        }




    }



    //--------------------------------------------------------------------
    // Build the Insert command String
    //--

    //---------------------------------------------------------------------------------
    // Create the SqlCommand
    //---------------------------------------------------------------------------------
    private String BuildInsertCommand(Ingredient ingredient)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        //use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', '{1}', '{2}')",ingredient.Name, ingredient.Image, ingredient.Calories);
        String prefix = "INSERT INTO  Ingredients " + "(name, image,calories) ";
        command = prefix + sb.ToString();
        return command;
    }

  

    private String BuildInsertCommand(DishRecipe dish)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        //use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', '{1}', '{2}','{3}')", dish.Name, dish.Image, dish.CookingMethod, dish.Time);
        String prefix = "INSERT INTO Recipes " + "(name,image,cookingMethod,time) ";
        command = prefix + sb.ToString();
        command += "SELECT SCOPE_IDENTITY()";
        return command;
    }
    private String BuildInsertCommand(int recipeId, int ingredientId)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        //use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', '{1}')", recipeId, ingredientId);
        String prefix = "INSERT INTO IngredientsRecipes " + "(recipeId, ingredientId) ";
        command = prefix + sb.ToString();
        return command;
    }

    private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 30;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

        return cmd;
    }
}

//__________________________________________________________________________________________________________________________


