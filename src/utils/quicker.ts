import os from "os";
import { memoryUsage, uptime } from "process";

export default {
    getSystemHealth: () => {
        return {
            cpuUsage: os.loadavg(),
            total: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
            free: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
        };
    },
    getApplicationHealth: () => {
        return {
            environment: process.env.NODE_ENV,
            uptime: `${process.uptime().toFixed(2)} Seconds`,
            memoryUsage: {
                heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
            }
        };
    }
};
