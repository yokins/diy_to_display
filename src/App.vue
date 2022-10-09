<template>
    <div class="app">
        <div class="buttons">
            <button @click="onClickAddRect">添加一个组件</button>
            <button @click="onClickExportJson">导出数据</button>
        </div>
        <div class="container" id="container"></div>

        <div class="display" id="display"></div>
    </div>
</template>

<script>
import CanvasPlugin from "./canvas_plugin.js";

export default {
    data() {
        return {
            drawer: null
        };
    },

    created() {
        this.$nextTick(() => {
            this.drawer = new CanvasPlugin("container");
        });
    },

    methods: {
        onClickAddRect() {
            this.drawer.addImage();
        },
        onClickExportJson() {
            const json = this.drawer.exportJson();
            const display = document.getElementById('display');
            json.forEach(item => {
                item.image.style.position = 'absolute';
                item.image.style.width = `${item.width}px`;
                item.image.style.height = `${item.height}px`;
                item.image.style.left =`${item.x}px`;
                item.image.style.top = `${item.y}px`;
                item.image.style.backgroundColor = 'white'
                display.append(item.image)
            })
        }
    }
};
</script>

<style>
.app {
    padding-top: 60px;
}
.buttons {
    display: flex;
    flex-flow: row nowrap;
    position: absolute;
    top: 25px;
    left: 25px;
}

.container {
    background-color: #f8f8f8;
    width: 600px;
    height: 1000px;
}


.display {
    background-color: #f8f8f8;
    width: 600px;
    height: 1000px;
    position: absolute;

    left: 800px;
    top:60px;
}
</style>
