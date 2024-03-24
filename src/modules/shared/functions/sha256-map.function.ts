import {createHash} from "crypto";

export function sha256Hash(object: any) {
    const hash = createHash('sha256');
    hash.update(JSON.stringify(object));
    return hash.digest('hex');
}