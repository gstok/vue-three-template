
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

    import OBJFunc from "../OBJLoader.js";
    OBJFunc(THREE);


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
                    camera.position.x = 5;
                    camera.position.y = 5;
                    camera.position.z = 5;
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

            //#region 创建场景对象的方法
                createGround () {
                    let planeGeometry = new THREE.PlaneGeometry(22, 22, 32);
                    let texture = new THREE.TextureLoader().load("/texture/ground.png");
                    let planeMaterial = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: texture,
                    });
                    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
                    plane.rotateX(Math.PI / 2);
                    plane.position.set(11, 0, 11);
                    return plane;
                },

                createWallBox () {
                    let geom = new THREE.BoxGeometry(1, 1, 1);
                    let texture = new THREE.TextureLoader().load("/texture/jinshu.jpeg");
                    let mate = new THREE.MeshPhongMaterial({
                        map: texture,
                    });
                    let box = new THREE.Mesh(geom, mate);
                    return box;
                },

                posTran (x, y) {
                    return new THREE.Vector3(0.5 + x, 0.5, 0.5 + y);
                },

                buildWall () {
                    for (let y = 0; y < 22; ++y) {
                        for (let x = 0; x < 22; ++x) {
                            if (y == 0 || x == 0 || y == 21 || x == 21) {
                                let box = this.createWallBox();
                                let v = this.posTran(x, y);
                                box.position.set(v.x, v.y, v.z);
                                this.scene.add(box);   
                            }
                        }
                    }
                },

                createSkyBox () {
                    let geom = new THREE.BoxGeometry(30, 30, 30);
                    var loader = new THREE.CubeTextureLoader();
                    loader.setPath("/texture/");

                    var textureCube = loader.load([
                        '1.png', '2.png',
                        '3.png', '4.png',
                        '5.png', '6.png'
                    ]);

                    var material = new THREE.MeshBasicMaterial( {
                        color: 0xffffff,
                        envMap: textureCube,
                        side: THREE.DoubleSide,
                    } );

                    let texture = new THREE.TextureLoader().load("/texture/jinshu.jpeg");
                    // let mate = new THREE.MeshPhongMaterial({
                    //     map: texture,
                    // });
                    let box = new THREE.Mesh(geom, material);
                    box.position.set(11, 0, 11);
                    return box;
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


            let plane = this.createGround();
            this.scene.add(plane);

            // let box = this.createWallBox();
            // this.scene.add(box);
            // let v = this.posTran(2, 0);
            // box.position.set(v.x, v.y, v.z);
            this.buildWall();

            let box = this.createSkyBox();
            this.scene.add(box);

            console.log(THREE);

            var loader = new THREE.OBJLoader();
            // load a resource
            loader.load(
                "/models/Buddha.obj",
                object => {
                    this.scene.add(object);
                },
            );
        },
        components: {

        },
    };
</script>

