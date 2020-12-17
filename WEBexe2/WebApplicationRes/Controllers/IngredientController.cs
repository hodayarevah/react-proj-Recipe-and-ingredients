using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplicationRes.Models;

namespace WebApplicationRes.Controllers
{
    public class IngredientController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Ingredient> Get()
        {
            return Ingredient.getIngredient();
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]Ingredient ingredient)
        {
            ingredient.insertIngredient();
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