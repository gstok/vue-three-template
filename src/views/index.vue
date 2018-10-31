
<!--局部样式-->
<style scoped>
    .viewIndex {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .threeWarp {
        width: 100%;
        height: 100%;
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
                    orbitControls: null,
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

            //#region THREE初始化相关方法
                //创建摄像机
                createCamera () {
                    let camera;
                    camera = new THREE.PerspectiveCamera(45, this.threeSize.width / this.threeSize.height, 0.1, 1000);
                    camera.position.x = 200;
                    camera.position.y = 200;
                    camera.position.z = 200;
                    return camera;
                },
                //创建渲染器
                createRender () {
                    let render;
                    render = new THREE.WebGLRenderer({
                        antialias: true,
                        alpha: true,
                    });
                    render.setClearColor(0xf0f0f0);
                    render.setSize(this.threeSize.width, this.threeSize.height);
                    render.gammaInput = true;
                    render.gammaOutput = true;
                    render.shadowMap.enabled = true;
                    return render;
                },
                //初始化轨道控制器
                initOrbitControls () {
                    let controls = new OrbitControls(this.camera, this.render.domElement)
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.25;
                    controls.enableZoom = true;
                    controls.autoRotate = true;
                    return controls;
                },
                //初始化THREE
                initThree () {
                    this.threeWarpDom = this.$el.querySelector(".threeWarp");
                    this.$threeWarp = $(this.threeWarpDom);
                    this.threeSize.width = this.$threeWarp.width();
                    this.threeSize.height = this.$threeWarp.height();

                    //创建场景
                    this.scene = new THREE.Scene();
                    //创建摄像机
                    this.camera = this.createCamera();
                    //创建WebGL渲染器
                    this.render = this.createRender();
                    //初始化轨道控制器
                    this.orbitControls = this.initOrbitControls();

                    this.camera.lookAt(this.scene.position);

                    //添加坐标系
                    let axes = new THREE.AxesHelper(100);
                    this.scene.add(axes);
                    
                    this.$threeWarp.append(this.render.domElement);
                    this.render.render(this.scene, this.camera);
                    this.animateThree();
                    $(window).resize(this.handleWindowResize);
                },
                //更新THREE画布尺寸方法
                updateThreeSize () {
                    this.camera.aspect = this.threeSize.width / this.threeSize.height;
                    this.camera.updateProjectionMatrix();
                    this.render.setSize(this.threeSize.width, this.threeSize.height);          
                },
                //THREE动画驱动
                animateThree () {
                    requestAnimationFrame(this.animateThree);
                    this.render.render(this.scene, this.camera);
                },
                //处理Window变化事件
                handleWindowResize (e) {
                    let size = {
                        width: this.$threeWarp.width(),
                        height: this.$threeWarp.height(),
                    };
                    this.threeSize = size;
                },
            //#endregion
        },
        created () {

        },
        mounted () {
            this.initThree();

            let light1 = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
            this.scene.add(light1);

            // let light2 = new THREE.AmbientLight( 0x404040 );
            // this.scene.add(light2);

            let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            this.scene.add(directionalLight);

            let planeGeometry = new THREE.PlaneGeometry(120, 120, 32);
            let planeMaterial = new THREE.MeshBasicMaterial({
                color: "pink",
                side: THREE.DoubleSide
            });
            let plane = new THREE.Mesh( planeGeometry, planeMaterial );
            plane.rotateX(Math.PI / 2);
            plane.position.set(60, 0, 60);
            this.scene.add(plane);

            let box1Geom = new THREE.BoxGeometry(120, 10, 10);
            let box1Mate = new THREE.MeshPhongMaterial({ color: 0x2BAAFF });
            let box1 = new THREE.Mesh(box1Geom, box1Mate);
            box1.position.set(60, 5, 5);
            this.scene.add(box1);

            let box2Geom = new THREE.BoxGeometry(120, 10, 10);
            let box2Mate = new THREE.MeshPhongMaterial({ color: 0x2BAAFF });
            let box2 = new THREE.Mesh(box2Geom, box2Mate);
            box2.position.set(60, 5, 115);
            this.scene.add(box2);

            let box3Geom = new THREE.BoxGeometry(10, 10, 100);
            let box3Mate = new THREE.MeshPhongMaterial({ color: 0x2c35FF });
            let box3 = new THREE.Mesh(box3Geom, box3Mate);
            box3.position.set(5, 5, 60);
            this.scene.add(box3);

            let box4Geom = new THREE.BoxGeometry(10, 10, 100);
            let box4Mate = new THREE.MeshPhongMaterial({ color: 0x2c35FF });
            let box4 = new THREE.Mesh(box4Geom, box4Mate);
            box4.position.set(115, 5, 60);
            this.scene.add(box4);

            for (let y = 0; y < 10; ++y) {
                for (let x = 0; x < 10; ++x) {
                    if (Math.random() * 2 < 1) {
                        let colorList = ["#CDB7B5", "#9BCD9B", "#FF6A6A", "#333333", "#912CEE", "#878787"];
                        let boxGeom = new THREE.BoxGeometry(10, 10, 10);
                        let num = Math.floor((Math.random() * 6));

                        var texture = new THREE.TextureLoader().load("/texture/box.png");

                        let boxMate = new THREE.MeshBasicMaterial({
                            color: 0xffffff,
                            map: texture,
                        });
                        let box = new THREE.Mesh(boxGeom, boxMate);
                        box.position.set(10 * x + 15, 5, 10 * y + 15);
                        this.scene.add(box);
                    }
                    else {
                        console.log(2);
                    }     
                }
            }
        },
        components: {

        },
    };
</script>

