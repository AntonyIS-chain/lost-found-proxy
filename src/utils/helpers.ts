import config from "../config";

const { gateway} = config


export async function GetHeaders(token:string, sourceSystem:string): Promise<Record<string, string>> {
    return {
        Authorization: `Bearer ${token}`,
        "x-source-system": sourceSystem,
    }
}