create table Ingredients (
id int IDENTITY(1,1) primary key,
name varchar(200),
image varchar(max),
calories int 
)


create table Recipes (
id int IDENTITY(1,1) primary key,
name varchar(200),
image varchar(max),
cookingMethod varchar(max),
time int
)




create table IngredientsRecipes (
recipeId int  ,
ingredientId int,
FOREIGN KEY (recipeId) REFERENCES Recipes(id),
FOREIGN KEY (ingredientId) REFERENCES Ingredients(id),
PRIMARY KEY (recipeId,ingredientId)
)