// Checks that your browser supports WebGL. 
if (!Detector.webgl) Detector.addGetWebGLMessage();

var renderer = null;
var scene = null;
var camera = null;
var piano = null;
var piano_group = null;
var earth = null;
var moon = null;
var solar_sys = null;
var moon_group = null;
var mars = null;
var cameraAngle = null;
var curTime = Date.now();
var key_grp = null;

// This function is called whenever the document is loaded
function init() {


    // Get display canvas
    var canvas = document.getElementById("webglcanvas");
    console.log(canvas);

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    // Create a new Three.js scene
    scene = new THREE.Scene();
    // scene.background = new THREE.TextureLoader().load( 'images/MilkyWay/posy.jpg' );
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height,
        1, 4000);

    camera.position.z = 20;


    //  Create the sun map & geometry
    var piano = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var key2color = new THREE.MeshBasicMaterial({ color: 0xf1ff });
    var geometry = new THREE.CubeGeometry(5, 1, 2);

    key1 = new THREE.Mesh(geometry, piano);
    key1.position.set(0, 0, 0);
    key1.rotation.y = Math.PI / 2;

    key2 = new THREE.Mesh(geometry, key2color);
    key2.position.set(2, 0, 0);
    key2.rotation.y = Math.PI / 2;

    key3 = new THREE.Mesh(geometry, piano);
    key3.position.set(4, 0, 0);
    key3.rotation.y = Math.PI / 2;

    key4 = new THREE.Mesh(geometry, key2color);
    key4.position.set(6, 0, 0);
    key4.rotation.y = Math.PI / 2;

    key5 = new THREE.Mesh(geometry, piano);
    key5.position.set(8, 0, 0);
    key5.rotation.y = Math.PI / 2;

    key6 = new THREE.Mesh(geometry, key2color);
    key6.position.set(10, 0, 0);
    key6.rotation.y = Math.PI / 2;

    key7 = new THREE.Mesh(geometry, piano);
    key7.position.set(12, 0, 0);
    key7.rotation.y = Math.PI / 2;

    /// GROUPS ---------------------------------------------


    /// K1 -----
    key_group1 = new THREE.Group();
    key_group1.add(key1);
    key_group1.position.set(-2.5, 0.5, 2.5);

    real_k1 = new THREE.Group();
    real_k1.add(key_group1)
    real_k1.position.set(0, 0, 0);


    /// K2 ----------
    key_group2 = new THREE.Group();
    key_group2.add(key2);
    key_group2.position.set(-2.5, 0.5, 2.5);

    real_k2 = new THREE.Group();
    real_k2.add(key_group2)
    real_k2.position.set(0, 0, 0);


    /// K3 -------------
    key_group3 = new THREE.Group();
    key_group3.add(key3);
    key_group3.position.set(-2.5, 0.5, 2.5);

    real_k3 = new THREE.Group();
    real_k3.add(key_group3)
    real_k3.position.set(0, 0, 0);


    /// K4 ---------------
    key_group4 = new THREE.Group();
    key_group4.add(key4);
    key_group4.position.set(-2.5, 0.5, 2.5);

    real_k4 = new THREE.Group();
    real_k4.add(key_group4)
    real_k4.position.set(0, 0, 0);


    /// K5 -----------------
    key_group5 = new THREE.Group();
    key_group5.add(key5);
    key_group5.position.set(-2.5, 0.5, 2.5);

    real_k5 = new THREE.Group();
    real_k5.add(key_group5)
    real_k5.position.set(0, 0, 0);


    /// K6 -----------------
    key_group6 = new THREE.Group();
    key_group6.add(key6);
    key_group6.position.set(-2.5, 0.5, 2.5);

    real_k6 = new THREE.Group();
    real_k6.add(key_group6)
    real_k6.position.set(0, 0, 0);


    /// K7 -----------------
    key_group7 = new THREE.Group();
    key_group7.add(key7);
    key_group7.position.set(-2.5, 0.5, 2.5);

    real_k7 = new THREE.Group();
    real_k7.add(key_group7)
    real_k7.position.set(0, 0, 0);


    piano_group = new THREE.Group();
    piano_group.add(real_k1);
    piano_group.add(real_k2);
    piano_group.add(real_k3);
    piano_group.add(real_k4);
    piano_group.add(real_k5);
    piano_group.add(real_k6);
    piano_group.add(real_k7);

    piano_group.position.set(-3,0,0);


    /// CAMERA CONTROLS ------------------------------------------

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 20;

    // Finally, add the mesh to our scene
    scene.add(piano_group);


    ///// AUDIO CONTROLS
    var ktab = [
        { key: 65, f: 261.63, c: real_k1, man: {} }, 
        { key: 90, f: 293.66, c: real_k2, man: {} }, 
        { key: 69, f: 329.63, c: real_k3, man: {} }, 
        { key: 82, f: 349.23, c: real_k4, man: {} }, 
        { key: 84, f: 392.0,  c: real_k5, man: {} },
        { key: 89, f: 440.0,  c: real_k6, man: {} },
        { key: 85, f: 493.88, c: real_k7, man: {} }
    ];
    
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = 0.8;
    master.connect(ctx.destination);

    // transpose note for better effect 
    const transpose = (freq, steps) => freq * Math.pow(2, steps / 12);

    function initTabNotes(keytab)
    {
        for (let i = 0; i < keytab.length; i++) {
            const manager = {
                vco: ctx.createOscillator(),
                vca: ctx.createGain(),
                vco2: ctx.createOscillator(),
                vca2: ctx.createGain()
            }
  
            keytab[i]['man'] = manager;

            const startingPitch = keytab[i]['man'].vco.frequency.value;

            keytab[i]['man'].vco2.frequency.value = transpose(startingPitch, 7);

            keytab[i]['man'].vco2.connect(manager.vca2);
            keytab[i]['man'].vca2.connect(master);

            keytab[i]['man'].vco.frequency.value = keytab[i]['f'];
            keytab[i]['man'].vco.start();
            keytab[i]['man'].vco2.start();

            keytab[i]['man'].vco.connect(manager.vca);
            keytab[i]['man'].vca.connect(master);


            keytab[i]['man'].vca.gain.value = 0.0001;
            keytab[i]['man'].vca2.gain.value = 0.0001;
            
            
        }
    }
    
        
    // ---------------------------------- MANAGE SOUND
    // create Oscillator node 
    // var oscillator = ctx.createOscillator();
    // oscillator.type = 'triangle';
    // oscillator.start()

    osctab = initTabNotes(ktab);
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    
    async function soundNote(man, container, freq) {
        man['vca'].gain.exponentialRampToValueAtTime(1, ctx.currentTime);
        man['vca2'].gain.exponentialRampToValueAtTime(1, ctx.currentTime );
        container.rotation.x = 0.1;
    }

    async function stopNote(man, container) {
        man['vca'].gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        man['vca2'].gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        container.rotation.x = 0;
    }


    
    // ----------------- controls
    document.addEventListener("keydown", setupKeyControls, false);
    function setupKeyControls(e) {
        ctx.resume();
        var k = e.keyCode;
        for (let i = 0; i < ktab.length; i++) {
            if (ktab[i]['key'] == k)
            {
                let man = ktab[i]['man'];
                let c = ktab[i]['c'];
                soundNote(man, c, ktab[i]['f']);
            }
            
        }
    }

    document.addEventListener("keyup", releaseNotes, false);
    function releaseNotes(e) {
        var k = e.keyCode;
        for (let i = 0; i < ktab.length; i++) {
            if (ktab[i]['key'] == k)
            {
                let man = ktab[i]['man'];
                let c = ktab[i]['c'];
                stopNote(man, c);
            }
        }
    }



}

// This function is called regularly to update the canvas webgl.
function run() {
    // Ask to call again run 
    requestAnimationFrame(run);

    // Render the scene
    render();

    // Calls the animate function if objects or camera should move
    animate();
}

// This function is called regularly to take care of the rendering.
function render() {
    // Render the scene
    renderer.render(scene, camera);
}

// This function is called regularly to update objects.
function animate() {

    // Computes how time has changed since last display
    var now = Date.now();
    var deltaTime = now - curTime;
    curTime = now;
    var fracTime = deltaTime / 1000; // in seconds
    // Now we can move objects, camera, etc.
    // Example: rotation cube
    var angle = 0.1 * Math.PI * 2 * fracTime; // one turn per 10 second.
    var angleR = fracTime * Math.PI * 2;

}