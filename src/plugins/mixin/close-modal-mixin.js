export default {
    methods: {
        close(e) {
            if (e.keyCode === 27) this.$router.push("/");
        }
    },
    created() {
         window.addEventListener("keyup", this.close);
    },
    beforeDestroy() {
        window.removeEventListener("keyup", this.close);
    },
    beforeClose() {
        window.removeEventListener("keyup", this.close);
    }
};