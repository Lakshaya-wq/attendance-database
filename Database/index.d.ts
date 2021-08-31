export = Database;

interface user {
    _id: string,
    username: string,
    password: string,
    fullName: string
}

interface student {
    _id: string,
    standard: string,
    roll_no: number,
    name: string
}

declare class Database {
    constructor();
    getStudent(roll_no: number, standard: string): Promise<student>;
    getStudentsByClass(standard: string): Promise<student[]>;
    verifyLogin(username: string): Promise<user>;
    addStudent(id: string, roll_no: number, standard: string, name: string): Promise<string>;
    removeStudentById(id: string): Promise<string>;
    editStudent(id: string, field: string, value: string): Promise<string>;
}
