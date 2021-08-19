export function render(req: express.Request, res: express.Response, next: express.NextFunction): any;
export function login(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
export function logout(req: express.Request, res: express.Response, next: express.NextFunction): void;
import express = require('express');
