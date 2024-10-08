import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @method  GET
 * @route   api/users/logout
 * @dec     logout from Profile
 * @access  Public
 **/

export function GET(request: NextRequest) {
  try {
    // delete cookie
    cookies().delete("jwtToken");
    // send response to client
    return NextResponse.json({ message: " logout " }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: " internal server error" },
      { status: 500 }
    );
  }
}
