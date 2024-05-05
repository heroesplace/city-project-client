<template>
    <div class="mail-invite">
        <div class="picto">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256">
                <path id="Wenrexa_Paper" data-name="Wenrexa Paper" class="cls-1" d="M60.507,223.51c-6.78-11.3-27.851-89.42-21.283-159.924S28.262,12.418,19.352,13.345C10.393,14.277,6,18,6,18S27.427-8.547,49.721,3.847s126.157-.4,138.35-1,32.7,188.769,46.241,194.714,16.872-6.748,16.872-6.748,12.62,19.9-27,32.743-116.861,5.7-129.975-2.374-11.123-11.123-11.123-11.123S67.287,234.809,60.507,223.51ZM12.6,26.468c5.992,2.838,8.887,32.109,6.749,64.113S25.26,242.664,39.6,250.551a27.91,27.91,0,0,0,26.995,0s-9.516,10.422-20.246-28.369C19.244,124.2,35.491,33.771,32.85,23.093S1.869,21.383,12.6,26.468ZM81.091,225.556s-6.038,10.922-10.123,13.5,145.131,8.631,164.344,0,13.5-20.246,13.5-20.246S204.363,254.974,81.091,225.556Z"/>
            </svg>
        </div>
        <div class="message">
            <span>{{ item.sender.characterName }} vous invite à fonder un village !</span>
        </div>
        <div class="buttons">
            <button @click='accept(item.sender._id)'>A</button>
            <button @click='decline(item.sender._id)'>R</button>
        </div>
    </div>
</template>

<style>
    div.mail-invite {
        cursor: pointer;
        transition: 0.1s;
        border: 2px solid transparent;
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        padding: 2%;
    }

    div.mail-invite:hover {
        background: #3e4b34;
        border: 2px solid #90e73b;
        box-shadow: 2px 2px 10px #90e73bF0;
    }

    div.mail-invite .picto {
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.mail-invite .picto svg {
        fill: white;
        height: 100%;
        width: 100%;
    }

    div.mail-invite .message {
        width: 55%;
        display: flex;
        align-self: center;
    }

    div.mail-invite .message span {
        height : 100%;
        width: 100%;
    }

    div.mail-invite .buttons {
        display: flex;
        justify-content: space-between;
    }

    div.mail-invite .buttons button {
        height: 6vh;
        width: 6vh;
        background: transparent;
        color: white;
        font-size: 1.5em;
        cursor: pointer;
        border: 1px solid white;
    }

</style>

<script>
    import { socket } from "@/api/socket/socket.js"
    import { defineComponent } from "vue"

    export default defineComponent({
        props: {
            item: {
                type: Object, // ou tout autre type attendu
                required: true
            }
        },
        setup(props) {
        },
        methods: {
            accept(sender) {
                socket.emit("invite_reply", { sender: sender, answer: true })
            },
            decline(sender) {
                socket.emit("invite_reply", { sender: sender, answer: false })
            }
        }
    })
</script>