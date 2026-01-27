/**
 * Temporary in-memory store
 * Replace with DB later
 */

const users: any[] = [];

export class UserService {
  static getAll() {
    return users.map(({ password, ...rest }) => rest);
  }

  static add(user: any) {
    users.push(user);
  }
}
