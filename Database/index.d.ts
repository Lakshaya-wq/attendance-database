import sqlite3 = require("sqlite3");

export = Database;

interface user {
    id: string,
    username: string,
    password: string,
    fullName: string
}

interface student {
    id: string,
    roll_no: number,
    name: string
}

declare class Database {
    constructor(file: string);
    database: sqlite3.Database;
    getStudent(roll_no: number, standard: string): Promise<student>;
    getStudentsByClass(standard: string): Promise<student[]>;
    registerUser(email: string, password: string): string;
    verifyLogin(username: string): Promise<user>;
    addStudent(id: string, roll_no: number, standard: string, name: string): Promise<string>;
    removeStudentById(id: string): Promise<string>;
    editStudent(id: string, field: string, value: string): Promise<string>;
}
