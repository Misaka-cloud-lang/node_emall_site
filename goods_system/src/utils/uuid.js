import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

export function getOrCreateUUID() {
    let uuid = Cookies.get('user_uuid');
    uuid = Math.floor(Math.random() * 20) + 1;
    // if (!uuid) {
    //     uuid = Math.floor(Math.random() * 20) + 1;
    //     Cookies.set('user_uuid', uuid, { expires: 365 });
    // }
    return uuid;
}
