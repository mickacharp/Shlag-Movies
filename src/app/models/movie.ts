export class Movie {
  constructor(
    public title: string,
    public director: string,
    public year: number,
    public genre: string,
    public img: string,
    public audience: string,
    public synopsis: string,
    public id?: string
  ) {}
}
