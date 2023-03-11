import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let user

    try{

    try{
      const newUser = await db.user.create({
        data: {
          userName: req.body.userName,
          password: await hashPassword(req.body.password),
          firstName: req.body.firstName,
          LastName: req.body.LastName,
        },
      });
      user = newUser

    }catch(error){
      res.status(422)
      console.log(error)
      return res.json({error: error})
    }

    try{
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(201);
      res.json(user);

    }catch(e){
      res.status(400)
      return res.json({error: e})
    }
  }catch(error){
    res.status(422)
    console.log(error)
    return res.json({error: error})
  }
    
  } else {
    res.status(402);
    return res.json({error: 'incorrect method'});
  }
}