import { instance } from './web'

export const invite_character = (character_name) => {
    return instance.request({
        method: 'post',
        url: 'invitations/invite_character',
        data: {
            character_name: character_name
        },
        headers: {
            'Authorization': "Bearer " + document.cookie.split('=')[1]
        }
    })
}