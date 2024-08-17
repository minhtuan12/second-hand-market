import {NextRequest, NextResponse} from 'next/server'
import _ from 'lodash'
import {SERVER_AUTH_TOKEN, SERVER_USER_PROFILE} from "../utils/cookie/constants";

export function middleware(request: NextRequest) {
    const requestCookies = request.cookies
    const token: string | undefined = requestCookies.has(SERVER_AUTH_TOKEN) ?
        requestCookies.get(SERVER_AUTH_TOKEN)?.value : ''

    let authUserProfile: object = {}
    if (requestCookies.has(SERVER_USER_PROFILE)) {
        authUserProfile = JSON.parse(<string>requestCookies.get(SERVER_USER_PROFILE)?.value)
    }

    const currentPathname: string = request.nextUrl.pathname
    const authPathNames: string[] = ['/login', '/register', '/forgot-password', '/reset-password']
    if (token && !_.isEmpty(authUserProfile)) {
        if (authPathNames.includes(currentPathname)) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }


        // return NextResponse.redirect(new URL('/', request.url))
        }

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
