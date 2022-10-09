import Konva from "konva";

export default class CanvasPlugin {
    stage = null;
    layer = null;

    groupMap = new Map();
    rectMap = new Map();
    imageMap = new Map();

    constructor(id) {
        this.stage = new Konva.Stage({
            container: id,
            width: 600,
            height: 1000
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        this.layer.draw();
    }

    exportJson() {
        console.log(this.layer);
        // return this.layer.toJSON();
        const images = this.layer.children.map(g => {
            const bg = g.children.find(item => {
                return item.attrs.name == "bg"
            })
            const image = bg.attrs.image;
            return {
                image,
                x: g.attrs.x,
                y: g.attrs.y,
                width: g.attrs.width,
                height: g.attrs.height
            };
        });
        return images;
    }

    addImage() {
        const image = new Konva.Image({
            x: 0,
            y: 0,
            width: 200,
            height: 160,
            fill: "white",
            stroke: "green",
            strokeWidth: 2,
            name: "bg"
        });

        const group = new Konva.Group({
            x: 0,
            y: 0,
            draggable: true
        });

        this.layer.add(group);
        group.add(image);
        this.addIcon(group, 0, 0, "setting", "/images/setting.png");
        this.addIcon(group, 0, 120, "type", "/images/img.png");
        this.addIcon(group, 160, 120, "drag", "/images/drag.png");

        const imageObj = new Image();
        imageObj.onload = () => {
            image.image(imageObj);
            this.layer.draw();
        };
        imageObj.src = "/images/bg.png";
    }
    /**
     * @description: 添加右下角拖动的ICON
     * @return {*}
     */
    addIcon(group, x, y, name, url) {
        const _this = this;
        const stage = group.getStage();
        const layer = group.getLayer();

        const image = new Konva.Image({
            x: x,
            y: y,
            name: name,
            fill: "white",
            width: 40,
            height: 40,
            stroke: "green",
            strokeWidth: 2,
            draggable: name == "drag"
        });

        if (name == "drag") {
            image.on("dragstart", function () {
                group.draggable(false);
                this.moveToTop();
            });
            image.on("dragmove", function () {
                _this.update(this);
                layer.draw();
            });
            image.on("dragend", function () {
                group.draggable(true);
            });
        }

        group.add(image);

        const imageObj = new Image();
        imageObj.onload = () => {
            image.image(imageObj);
            layer.draw();
        };
        imageObj.src = url;
    }

    update(icon) {
        const group = icon.getParent();
        const bg = group.children.find(item => item.attrs.name == "bg");
        const setting = group.children.find(
            item => item.attrs.name == "setting"
        );
        const type = group.children.find(item => item.attrs.name == "type");
        const drag = group.children.find(item => item.attrs.name == "drag");

        const right_x = icon.getX();
        const right_y = icon.getY();

        const left_x = setting.getX();
        const left_y = setting.getY();

        const width = right_x - left_x;
        const height = right_y - left_y;

        if (width && height) {
            bg.width(width + 40);
            bg.height(height + 40);
            group.width(width + 40);
            group.height(height + 40);
            type.y(right_y);
        }
    }
}
