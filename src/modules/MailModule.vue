<template>
    <div class="mailbox">
        <div v-if="mail_list.length > 0">
            <div v-for="item in mail_list" :key="item" >
                <div v-if="item.type === 'invite'">
                    <InviteMail :item="item" />
                </div>
                <p v-else-if="type === 'B'">Type B</p>
            </div>
        </div>
        <div v-else>
            <NoMail />
        </div>
    </div>
</template>

<style>
    div.mailbox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start; 
        overflow-y: auto;
        box-sizing: border-box;
        padding: 2%;
    }
</style>

<script setup>
    import { socket } from "@/api/socket/socket.js"
    import { ref, onMounted, onUnmounted } from "vue"

    import InviteMail from "./mail/InviteMail.vue"
    import NoMail from "./mail/NoMail.vue"

    const mail_list = ref([])

    onMounted(() => {
        socket.emit("pull_character_mailbox")

        socket.on("update_character_mailbox", (data) => {
            console.log(data)
            mail_list.value = data.mail_list
            // console.log("invites : ", data.mail_list)
        })
    })

    onUnmounted(() => {
        socket.off("update_character_mailbox")
    })

</script>