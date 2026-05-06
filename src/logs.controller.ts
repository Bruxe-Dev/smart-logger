import { Controller, Req, Res, Query, Body, Post, Get, Param, Head } from "@nestjs/common";
import { log } from "console";
import type { Request } from "express";
import Log from "types/logs";

let logs: Log[] = [];
let blockedIps = new Set()

@Controller()
export class LogsController {
    @Post('track')
    track(@Req() req: Request) {
        if (blockedIps.has(req.ip)) {
            return { status: 'rejected', message: 'Sorry, But your Ip is blocked.' }
        }
        const newLog = {
            id: Date.now(),
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
            headers: req.headers['user-agent'],
            timestamp: new Date().toISOString(),
        };

        logs.push(newLog);
        return { message: "New Log created successfully", data: newLog }
    }

    @Get()
    getLogs(@Query('method') method?: string, @Query('ip') ip?: string) {
        let filteredLogs = logs

        if (method) {
            filteredLogs = filteredLogs.filter(l => l.method === method.toUpperCase())
        }
        if (ip) {
            filteredLogs = filteredLogs.filter(l => l.ip === ip)
        }

        return filteredLogs;
    }
}