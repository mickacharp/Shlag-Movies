export class User {
  constructor(
    public uid: string,
    public email: string,
    public photoURL?: string,
    public displayName?: string,
    public myCustomData?: string
  ) {}
}
