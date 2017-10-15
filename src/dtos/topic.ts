export class Topic {
    id : number;
    summary : string;
    title : string;
    author : string;
    tag : string[];
    like : number;
    date : Date;

    constructor (id : number,summary:string,title : string){
        this.id=id;
        this.summary=summary;
        this.title=title;
    }

}