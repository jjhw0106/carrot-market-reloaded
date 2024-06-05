import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  const user = await db.user.findMany({
    select: {
      id: true,
      username: true,
      password: false,
    },
    where: {
      username: {
        contains: "",
      }
    }
  })
  console.log(user);
  // const user = await db.user.create({
  //   data: {
  //     username: "jhw"
  //   }
  // })
  // console.log(user);
}

test();
export default db;


