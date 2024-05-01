<template>
    <div class="toolbar">
        <div class="inner">
            <div class="tool_button icon-1">
                <img src="/svg/character.svg">
            </div>
            <div class="tool_button icon-2">
                <img src="/svg/bag.svg">
            </div>
            <div class="tool_button icon-3">
                3
            </div>
            <div class="tool_button icon-4">
                4
            </div>
            <div class="tool_button icon-5" @click="tw('village')">
                <img src="/svg/shield.svg">
            </div>
            <div class="tool_button icon-6" @click="tw('mailbox')">
                M
            </div>
            <div class="tool_button icon-7">
                <img src="/svg/discord.svg">
            </div>
            <div class="tool_button icon-8" @click="tw('settings')">
                <img src="/svg/settings.svg">
            </div>
            <div class="tool_button icon-9" @click="disconnect()">
                <img src="/svg/disconnect.svg">
            </div>
        </div>
    </div>
</template>

<script>
import { logout } from '../api/web/auth.js'

export default {
    name: 'Window',
    props: {
        toggleWindow: Function
    },
    methods: {
        disconnect() {
            console.log("Disconnecting...")
            logout()
            close()
        },
        tw(window) {
            this.toggleWindow(window)
        }
    }
}
</script>

<style type="sass">
@import "../assets/modules/toolbar.sass";
</style>