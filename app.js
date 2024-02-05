import express from 'express'
import { PrismaClient } from '@prisma/client'

const PORT = process.env.PORT

const app = express()

const prisma = new PrismaClient()

app.use(express.static('public'));

// Set EJS as templating engine
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", async function(req, res) {
   const unsorted_names = await prisma.food.findMany({
      select: {
         id: true,
         name: 'asc',
         name: true,
      },
      orderBy: {
         name: 'asc',
      },
   });
   const names = unsorted_names.sort()
   res.render("index", { title: "Search food", names }) // render page, whose template is in ./views/index.ejs
})


app.post('/id', async (req, res) => {
   
   try {
      const food_id = parseInt(req.body.food_id, 10);

      const db_food_id = await prisma.food.findUnique({
         where: { id: food_id }
      })

      const nutdata = await prisma.nutdata.findMany({
         where: { food_id }
      })

      const nutrients = await prisma.nutrient.findMany({
         orderBy: {
            name: "asc"
         }
      })
      res.render("response", {title: "Answer", db_food_id, nutdata, nutrients});
   }
   catch {
      res.redirect('/');
   }
      
   
});

app.get('/:searched', async (req, res) => {
   const search_name = req.params.searched
   const db_search_name = await prisma.food.findMany({
      where: { 
         name: {
            contains : search_name,
            mode: 'insensitive'
         }
      },
      select:{
         id: true,
         name: true
      },
      orderBy: {
         name: 'asc'
       }
   })
   // res.render("response", {title: "Answer", db_food_id, nutdata, nutrient});
   res.send(db_search_name)
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
