type Log = {
    id: number;
    ip: string | undefined;
    method: string;
    url: string;
    headers: string | undefined;
    timestamp: string;
};

export default Log