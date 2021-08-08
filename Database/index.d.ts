export = Database;
declare class Database {
    constructor(file: string);
    database: any;
    getStudent(roll_no: number, standard: string): Promise<object>;
    getStudentById(id: string): Promise<object>;
    getStudentsByClass(standard: string): Promise<object[]>;
    getAttendance(roll_no: number, standard: string): Promise<object[]>;
    getAttendanceByClass(standard: string): Promise<object[]>;
    getClassAttendanceByDate(standard: string, date: string): Promise<object[]>;
    setAttendance(date: string, standard: string, roll_no: number, name: string, att: string): void;
    getDates(standard: string): Promise<object[]>;
    registerUser(email: string, password: string): string;
    verifyLogin(username: string): Array<any>;
}
