import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";


// Generate Jwt Token
export function generateToken(payload: JWTPayload) {
  const privateKey = process.env.SECRET_KEY;
  const token = jwt.sign( payload , privateKey as string, {
    expiresIn: "30d",
  }) as string;
  return token;
}


// Set Cookie with Jwt
export function setCookie( JWTPayload : JWTPayload ) : string {

  const token = generateToken( JWTPayload )
  const cookie = serialize( "jwtToken" , token , { 
    httpOnly : true ,
    secure : process.env.NODE_ENV === "production" ,
    sameSite : "strict" ,
    path : "/" ,
    maxAge : 60*60*24*30
   } )
   return cookie
}
