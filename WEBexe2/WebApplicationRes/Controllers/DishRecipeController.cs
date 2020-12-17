﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplicationRes.Models;

namespace WebApplicationRes.Controllers
{
    public class DishRecipeController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<DishRecipe> Get()
        {
            return DishRecipe.getDishRecipe();
        }
        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public int Post([FromBody]DishRecipe dishRecipe)
        {
           
            try
            {
                DishRecipe.insertDishRecipe(dishRecipe);
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
       

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}