import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';

export interface Credentials {
  username: string;
  password: string;
}

export class BasicAuthenticationStrategy implements AuthenticationStrategy {
  name = 'basic';

  constructor(
    // Inject your environment variable here
  ) {
  }

  extractCredentials(request: Request): Credentials {
    const headerValue = request.headers.authorization;
    if (!headerValue) {
      throw new HttpErrors.Unauthorized('Authorization header not found.');
    }

    const matches = headerValue.match(/^Basic\s+([^\s]+)/);

    if (!matches) {
      throw new HttpErrors.Unauthorized('Authorization header is not of type Basic.');
    }

    const base64Credentials = matches[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    return {username, password};
  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const credentials: Credentials = this.extractCredentials(request);

    if (!credentials.username || !credentials.password) {
      throw new HttpErrors.Unauthorized('Missing username or password.');
    }

    if (credentials.username !== process.env.USERNAME || credentials.password !== process.env.PASSWORD) {
      throw new HttpErrors.Unauthorized('Invalid credentials.');
    }

    return {
      [securityId]: credentials.username, // replace with the user's ID
      name: credentials.username, // replace with the user's name
      roles: [process.env.ROLE], // replace with the user's roles
    };
  }
}
