import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await db.user.create({
      data: {
        userName: req.body.userName,
        password: await hashPassword(req.body.password),
        firstName: req.body.firstName,
        LastName: req.body.LastName,
      },
    });

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
      console.log(e)
      res.status(400)
      res.json({error: e})
    }
    
  } else {
    res.status(402);
    res.json({error: 'incorrect method'});
  }
}