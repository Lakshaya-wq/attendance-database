export = Database;
declare class Database {
    constructor(file: any);
    database: any;
    getStudent(roll_no: any, standard: any): any;
    getStudentsByClass(standard: any): any;
    getAttendance(roll_no: any, standard: any): any;
    getAttendanceByClass(standard: any): any;
}
