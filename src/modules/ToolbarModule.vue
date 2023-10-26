<template>
    <div class="toolbar">
        <div class="inner">
            <div class="tool_button" id="character">
                <img src="/svg/character.svg">
            </div>
            <div class="tool_button" id="inventory">
                <img src="/svg/bag.svg">
            </div>
            <div class="tool_button" id="3">3</div>
            <div class="tool_button" id="4">4</div>
            <div class="tool_button" data-window-name=".village_window" id="village">
                <img src="/svg/shield.svg">
            </div>
            <div class="tool_button" id="6">6</div>
            <div class="tool_button" id="discord">
                <img src="/svg/discord.svg">
            </div>
            <div class="tool_button" id="settings" @click="toggleWindow('settings_window')">
                <img src="/svg/settings.svg">
            </div>
            <div class="tool_button" id="disconnect" @click="disconnect()">
                <img src="/svg/disconnect.svg">
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '@/stores/auth'

const { logout } = useAuth()

function disconnect() {
    logout().then(() => {
        window.location.href = "/"
    })
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