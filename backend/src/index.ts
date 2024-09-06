import { PrismaClient } from '@prisma/client'
import express from "express";
import cors from "cors"
const prisma = new PrismaClient()
const app = express();
app.use(cors());
app.use(express.json());

// POSTMAN
app.get('/' , async(req,res) => {
    res.json({message:"Hello Raj!"})
})

app.get('/user/find-all', async(req,res) => {
    const users = await prisma.users.findMany();
    console.log("Users", users);
    res.json({users})
})

app.get('/home/find-by-user', async(req,res) => {
    const selectedUser:any = req.query.selected_user || '0';
    const user_id: number = parseInt(selectedUser, 10);
    const userWithHomes = await prisma.users.findUnique({
        where: {
          id: user_id,
        },
        include: {
          user_interests: {
            include: {
              homes: true,
            },
          },
        },
      });
      const homes = userWithHomes?.user_interests?.map(obj => obj.homes);
      console.log("HOMES", homes);
      res.json({homes})
})

app.get('/user/find-by-home', async(req,res) => {
  const selectedHome:any = req.query.home_id || '0';
  const home_id:number = parseInt(selectedHome);
    const home_users = await prisma.homes.findUnique({
        where : { id: home_id},
        include : {
            user_interests : {
                include:{ users: true}
            }
        }
    })
    const users = home_users?.user_interests?.map(obj => obj.users);
    console.log("HU", home_users);
    res.json({users})
})

app.put("/home/update-users", async(req,res) => {
  const home_id = req.body.home_id;
  const new_users_ids = req.body.checked_users;
  console.log("H,NU", home_id, new_users_ids);
try {
  await prisma.user_interests.deleteMany({
    where: {home_id:home_id}
  }); // First we are deleting all the old records from the DB
  new_users_ids.map(async(user_id:any) => {
    await prisma.user_interests.create({
      data:{
        home_id:home_id,
        user_id:user_id
      }
    })
  })
  return res.json({status:200, message:"Update Successfull!"});
} catch (error:any) {
  res.json({status:500, message:error.message});
}
})

app.listen(3000, () => { console.log("App Started!")});
