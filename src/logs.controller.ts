import { Controller, Req, Res, Query, Body, Post, Get, Param } from "@nestjs/common";
import type { Request } from "express";

let logs = [];
let blockedIps = new Set()

@Controller()
export class LogsController {
    @Post('track')
    track(@Req() req: Request) {
        if (blockedIps.has(req.ip)) {
            return { status: 'rejected', message: 'Sorry, But your Ip is blocked' }
        }
    }
}