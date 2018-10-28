
<!--局部样式-->
<style scoped>
    .viewIndex {
        width: 100%;
        height: 100%;
        /* display: flex;
        justify-content: center;
        align-items: center; */
    }

    .threeWarp {
        width: 50%;
        height: 480px;
        border: solid 1px black;
    }
</style>

<!--局部覆盖样式-->
<style>

</style>

<template>
    <div class="viewIndex">
        <div class="threeWarp"></div>
    </div>
</template>

<script>
    import * as THREE from "three";
    const OrbitControls = require("three-orbit-controls")(THREE);

    export default {
        name: "viewIndex",
        props: {

        },
        data () {
            return {
                //#region 页面对象
                    scene: null,
                    camera: null,
                    render: null,

                    threeWarpDom: null,
                    $threeWarp: null,
                    threeSize: {
                        width: 0,
                        height: 0,
                    },
                //#endregion

                //#region 页面内容绑定数据
                //#endregion

                //#region 页面样式绑定数据
                //#endregion
            };
        },
        watch: {
            threeSize (nv) {
                this.updateThreeSize();
            },
        },
        computed: {
            //#region 常量计算属性
            //#endregion

            //#region 数据转换计算属性
            //#endregion

            //#region 样式计算属性
            //#endregion
        },
        methods: {
            //#region 页面事件方法
            //#endregion

            //#region 业务逻辑方法
            //#endregion

            //#region 接口访问方法
            //#endregion

            //#region 数据转换方法
            //#endregion

            //#region 自动样式方法
            //#endregion

            //#region 其他方法
            //#endregion

            //更新Three尺寸方法
            updateThreeSize () {
                this.camera.aspect = this.threeSize.width / this.threeSize.height;
                this.camera.updateProjectionMatrix();
                this.render.setSize(this.threeSize.width, this.threeSize.height);          
            },

            //Three动画驱动
            animateThree () {
                requestAnimationFrame(this.animateThree);
                this.render.render(this.scene, this.camera);
            },
        },
        created () {

        },
        mounted () {

            this.threeWarpDom = this.$el.querySelector(".threeWarp");
            this.$threeWarp = $(this.threeWarpDom);

            this.threeSize.width = this.$threeWarp.width();
            this.threeSize.height = this.$threeWarp.height();

            this.scene = new THREE.Scene();

            //添加坐标系
            let axes = new THREE.AxesHelper(100);
            this.scene.add(axes);

            //创建摄像机
            this.camera = new THREE.PerspectiveCamera(45, this.threeSize.width / this.threeSize.height, 0.1, 1000);
            this.camera.position.x = 0;
            this.camera.position.y = 100;
            this.camera.position.z = 100;
            this.camera.lookAt(this.scene.position);

            //创建WebGL渲染器
            this.render = new THREE.WebGLRenderer();
            this.render.setClearColor(0xf0f0f0);
            this.render.setSize(this.threeSize.width, this.threeSize.height);
            this.render.gammaInput = true;
            this.render.gammaOutput = true;
            this.render.shadowMap.enabled = true;

            this.$threeWarp.append(this.render.domElement);
            this.render.render(this.scene, this.camera);

            $(window).resize(e => {
                let size = {
                    width: this.$threeWarp.width(),
                    height: this.$threeWarp.height(),
                };
                this.threeSize = size;
            });
            this.animateThree();

            let controls = new OrbitControls(this.camera, this.render.domElement)
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = true;
            controls.autoRotate = true;
        },
        components: {

        },
    };
</script>

