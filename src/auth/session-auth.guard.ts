import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Log the entire session object
    console.log('Session:', request.session);

    // Log just the user object inside the session for a more targeted approach
    if (request.session) {
      console.log('Session User:', request.session.user);
    }

    if (request.session && request.session.user) {
      return true;
    }
    throw new UnauthorizedException('You are not authorized');
  }
}