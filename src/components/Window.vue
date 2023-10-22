<template>
    <!-- Fenêtre settings -->
    <div class="settings_window" ref="window">
        <div class="inner">
            <div class="top">
                <div class="title" >{{ title }}</div>
                <div class="close" @click=closeWindow()>✕</div>
            </div>
            <div class="bottom">
                <div class="menu">
                    <div class="menu_button" id="general">Général</div>
                    <div class="menu_button" id="audio">Audio</div>
                    <div class="menu_button" id="video">Vidéo</div>
                    <div class="menu_button" id="gameplay">Gameplay</div>
                    <div class="menu_button" id="bindings">Touches</div>
                    <div class="menu_button" id="social">Social</div>
                    <div class="menu_button" id="interface">Interface</div>
                </div>
                <div class="content">
                    <div class="content_general">Contenu Général</div>
                    <div class="content_audio">Contenu Audio</div>
                    <div class="content_video">Plein écran
                        <input type="checkbox" id="fullscreen" onclick="toggleFullscreen()">
                    </div>
                    <div class="content_gameplay">Contenu Gameplay</div>
                    <div class="content_bindings">Contenu Touches</div>
                    <div class="content_social">Contenu Social</div>
                    <div class="content_interface">Contenu Interface</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'Window',
    props: {
        title: String,
        draggable: Boolean,
        display: Boolean
    },
    setup(props) {

    },
    mounted() {
        if (this.display) {
            this.$refs.window.style.display = 'block';
        } else {
            this.$refs.window.style.display = 'none';
        }

        if (this.draggable) {
            this.makeWindowDraggable(this.$refs.window, ".top")
        }
    },
    methods: {
        closeWindow() {
            let window = this.$refs.window

            if (window.style.display == '' || window.style.display == 'none') {
                window.style.display = 'block';
            }
            else {
                window.style.display = 'none';
            }
        },
        makeWindowDraggable(windowName, handleName) {
            $(document).ready(function() {
                $(windowName).draggable({
                    handle: handleName,
                    containment: ".user-interface",
                    stop: function(event, ui) { // Utiliser "stop" au lieu de "drag"
                        let h = Math.round(ui.position.top / $(window).height() * 100) + "vh"
                        let w = Math.round(ui.position.left / $(window).width() * 100) + "vw"

                        $(this).css({
                            top: h,
                            left: w
                        })
                    }
                })
            })
        }
    }
}

</script>

<style type="sass">
@import "../assets/components/window.sass";
</style>