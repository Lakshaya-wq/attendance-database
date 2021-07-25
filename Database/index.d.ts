export = Database;
declare class Database {
    constructor(file: string);
    database: any;
    getStudentByID(studentid: string): object;
    getStudentsByClass(standard: string): object;
}
