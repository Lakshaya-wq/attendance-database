export = Database;
declare class Database {
    constructor(file: string);
    database: any;
    getStudent(roll_no: number, standard: string): object;
    getStudentsByClass(standard: string): object[];
    getAttendance(roll_no: number, standard: string): object[];
    getAttendanceByClass(standard: string): object[];
}
