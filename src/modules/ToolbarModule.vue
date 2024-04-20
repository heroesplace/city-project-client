<template>
    <div class="toolbar">
        <div class="inner">
            <div class="tool_button icon-1" @click="test()">
                <img src="/svg/character.svg">
            </div>
            <div class="tool_button icon-2">
                <img src="/svg/bag.svg">
            </div>
            <div class="tool_button icon-3">3</div>
            <div class="tool_button icon-4">4</div>
            <div class="tool_button icon-5" @click="toggleWindow('village_window')">
                <img src="/svg/shield.svg">
            </div>
            <div class="tool_button icon-6" @click="toggleWindow('test_window')">🧪</div>
            <div class="tool_button icon-7">
                <img src="/svg/discord.svg">
            </div>
            <div class="tool_button icon-8" @click="toggleWindow('settings_window')">
                <img src="/svg/settings.svg">
            </div>
            <div class="tool_button icon-9" @click="disconnect()">
                <img src="/svg/disconnect.svg">
            </div>
        </div>
    </div>
</template>

<script setup>
import { close } from "@/api/socket/socket.js";
import { logout } from '../api/web/auth.js'

function disconnect() {
    console.log("Disconnecting...")
    logout()
    close()
}

function toggleWindow(windowId) {
    let window = document.querySelector("#" + windowId + ".window")

    if (window.style.display == '' || window.style.display == 'none') {
        window.style.display = 'block';
    }
    else {
        window.style.display = 'none';
    }
}
</script>

<style type="sass">
@import "../assets/modules/toolbar.sass";
</style>