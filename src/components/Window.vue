<template>
    <!-- Fenêtre settings -->
    <div class="settings_window" ref="window">
        <div class="inner">
            <div class="top">
                <div class="title" >{{ title }}</div>
                <div class="close" @click=closeWindow()>✕</div>
            </div>
            <div class="bottom">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Window',
    props: {
        title: String,
        draggable: Boolean,
        display: Boolean /* état d'affichage à l'ouverture de l'interface */
    },
    setup(props) {},
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