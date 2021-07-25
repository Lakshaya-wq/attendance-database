export = Database;
declare class Database {
    constructor(file: string);
    database: any;
    getStudent(name: string, standard: string): object;
    getStudentsByClass(standard: string): object;
}
