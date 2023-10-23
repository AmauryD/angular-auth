import jsonwebtoken from "jsonwebtoken";
import { getUserById } from "./database.js";
import { Connection } from "mysql2/promise";
import { Request } from "express";
// .env
const JWT_SECRET = 'ldRhkGA4ak3ZK2WAENqk/NZsxxhMMpY9jIvMHXFjWlo8rp0zyXO5/TabCI2X+BM0F0Lfva+Lr6ULmA7M5/AUkhseSRUARUDGasnnIjlvRRhd4Rln+Mw2M50NxQD/xlXUcS69Gqt3pBihfsmRr486e90yp1ZKYwdrAdMgOPt8gKu38Ttxiq0/2Cdd0Jq52JOTIoqlJIU3Uga1bQraH6gHmg4WCK27D2gvRpTDkkMIpFWEGemajNn1U00TMyIk5+31';

export function generateAccessToken(userId: string) {
  return jsonwebtoken.sign({
    id: userId,
  },JWT_SECRET);
}

export async function loggedUserId(connection: Connection,req: Request) {
  // Bearer <accessToken>
  const authorization = req.headers.authorization;
  if (!authorization) {
    return null;
  }
  const token = authorization.split(' ')[1];
  const decoded = jsonwebtoken.verify(token, JWT_SECRET);
  const userId = decoded['id'];

  const user = await getUserById(connection, userId);

  delete user?.password;

  return user;
}
