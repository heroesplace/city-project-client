<template>
    <div class="create_village">
        <div class="invitation_form">
            <div>
                <h3>Inviter un joueur</h3>
                <input type="text" v-model="member_search" maxlength=50 placeholder="Rechercher un personnage..." />

                <button @click="invite(member_search)">Inviter</button>
            </div>
            <div class="invitation_list">
                <div class="invited_member" v-for="item in members_list" :key="item">
                    <span>{{ item.character_name}}</span>
                    <span v-if="item.status == 0">
                        <img alt="Pending invitation" src="/png/hourglass.png" />
                    </span>
                    <span v-else-if="item.status == 1">
                        <img alt="Pending invitation" src="/png/suit_hearts.png" />
                    </span>
                    <span v-else-if="item.status == 2">
                        <img alt="Pending invitation" src="/png/suit_hearts_broken.png" />
                    </span>
                    <span v-else>
                        <img alt="Pending invitation" src="/png/crown_a.png" />
                    </span>
                </div>
            </div>
        </div>
        <div>
            <h3>Créer un village</h3>
            <input type="text" maxlength=50 placeholder="Nom du village... (50 chararactères max.)" />
            <button @click="">Créer</button>
            ou
            <button @click="cancelInvite">Annuler</button>
        </div>
    </div>
</template>

<style>
    div.create_village {
        padding: 1rem;
        height: calc(100% - 2rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    div.create_village h3 {
        padding: 0;
        margin: 0;
    }

    div.create_village div.invitation_form {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
    }

    div.create_village div.invitation_form div.invitation_list {
        overflow: auto;
        border: 1px solid #37373a;
        height: 100%;
    }

    div.create_village div.invitation_form div.invitation_list div.invited_member img {
        width: 1.5vw;
    }

    div.create_village div.invitation_form div.invitation_list div.invited_member {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        margin: 0.5vw;
        cursor: pointer;
    }

    div.create_village div.invitation_form div.invitation_list div.invited_member:first-child {
        border-bottom: 1px solid #37373a;
    }
</style>

<script setup>
    import { ref, onMounted, defineEmits } from "vue"
    import { socket } from "@/api/socket/socket.js"

    import lg from '../../locales/lg.js'

    const member_search = ref("")
    const members_list = ref([])

    const invite = (character) => {
        if (character == "") return

        // console.log(character)
        socket.emit("push_invite_character", character)

        // member_search.value = ""
    }

    onMounted(() => {
        socket.emit("pull_invite_members")
    })

    socket.on("update_invite_members", (data) => {
        members_list.value = data.members_list
        console.log(data.members_list)
    })

    const emits = defineEmits(['changeAction'])

    const backToDefault = () => {
        emits('changeAction', 'choose')
    }

    const cancelInvite = () => {
        socket.emit("push_invite_delete")
        backToDefault()
    }
</script>