using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplicationRes.Models
{
    public class Ingredient 
    {
        int id;
        string name;
        string image;
        int calories;
       
        public Ingredient()
        {

        }
        public Ingredient(string name, string image,int calories)
        {
            this.name = name;
            this.image = image;
            this.calories = calories;
        }

        public Ingredient(int id, string name, string image, int calories)
        {
            this.id = id;
            this.name = name;
            this.image = image;
            this.calories = calories;
        }

        public string Name { get => name; set => name = value; }
        public string Image { get => image; set => image = value; }
        public int Calories { get => calories; set => calories = value; }
        public int Id { get => id; set => id = value; }
        public int insertIngredient()
        {
            DBservices db = new DBservices();
            return db.addIngredient(this);
        }
        public static List<Ingredient> getIngredient()
        {
            DBservices db = new DBservices();
            return db.getIngredient();
        }

    }
}