<template>
  <div :id="id" class="window" ref="window" @mousedown="top()">
    <div class="top">
      <div class="title">{{ title }}</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Window',
    props: {
        title: String,
        id: String,
        draggable: Boolean,
        width: String,
        height: String
    },
    setup(props) {},
    mounted() {
        if (this.draggable) {
            this.makeWindowDraggable(this.$refs.window, ".top")
        }

        if (this.width && this.height) {
            // console.log(this.width, this.height)
            this.setWindowSize(this.width, this.height)
            this.alignWindow("center")
        }
    },
    methods: {
        top() {
            $(".window").css("z-index", 0)
            this.$refs.window.style.zIndex = 1;
        },
        setWindowSize(width, height) {
            let window = this.$refs.window

            window.style.width = width
            window.style.height = height
        },
        alignWindow(position) {
            let window = this.$refs.window

            if (position == "center") {
                window.style.top = "calc(50% - " + window.style.height + " / 2)"
                window.style.left = "calc(50% - " + window.style.width + " / 2)"
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