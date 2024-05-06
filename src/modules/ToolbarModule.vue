<template>
    <div class="toolbar">
        <div class="inner">
            <div class="tool_button icon-1">
                <img alt="character" src="/svg/character.svg">
            </div>
            <div class="tool_button icon-2">
                <img alt="bag" src="/svg/bag.svg">
            </div>
            <div class="tool_button icon-3">
                3
            </div>
            <div class="tool_button icon-4">
                4
            </div>
            <div class="tool_button icon-5" @click="tw('village')">
                <img alt="village" src="/svg/shield.svg">
            </div>
            <div class="tool_button icon-6" @click="tw('mailbox')">
                M
            </div>
            <div class="tool_button icon-7">
                <img alt="discord" src="/svg/discord.svg">
            </div>
            <div class="tool_button icon-8" @click="tw('settings')">
                <img alt="settings" src="/svg/settings.svg">
            </div>
            <div class="tool_button icon-9" @click="disconnect()">
                <img alt="" src="/svg/disconnect.svg">
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