import { NextRequest } from "next/server";
import { JWTPayload } from "./types";
import Jwt from "jsonwebtoken";

// verify Token for Routes
export  function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jwtToken = request.cookies.get('jwtToken') ;
    console.log({cookie:jwtToken})
    const token = jwtToken?.value || "";
    console.log({token})
    if (!token) {
      return null;
    }
    const privateKey = process.env.SECRET_KEY as string;
    const tokenPayload = Jwt.verify(token, privateKey) as JWTPayload;
    return tokenPayload;
  } catch (error) {
    return null;
  }
}

// verify Token for pages
export function verifyTokenForPages(token : string): JWTPayload | null {
  try {
    const privateKey = process.env.SECRET_KEY as string;
    const tokenPayload = Jwt.verify(token, privateKey) as JWTPayload ;
    if(!tokenPayload){
      return null
    }
    return tokenPayload;
  } catch (error) {
    return null;
  }
}

