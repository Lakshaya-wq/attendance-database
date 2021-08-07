export = Database;
declare class Database {
    constructor(file: any);
    database: any;
    getStudent(roll_no: any, standard: any): any;
    getStudentById(id: any): any;
    getStudentsByClass(standard: any): any;
    getAttendance(roll_no: any, standard: any): any;
    getAttendanceByClass(standard: any): any;
    getClassAttendanceByDate(standard: any, date: any): any;
    setAttendance(date: any, standard: any, roll_no: any, name: any, att: any): void;
    getDates(standard: any): any;
    registerUser(email: any, password: any): any;
    verifyLogin(email: any): any;
}
