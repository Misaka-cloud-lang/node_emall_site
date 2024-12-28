import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

export function getOrCreateUUID() {
    let uuid = Cookies.get('user_uuid');
    if (!uuid) {
        uuid = uuidv4();
        Cookies.set('user_uuid', uuid, { expires: 365 });
    }
    return uuid;
}
