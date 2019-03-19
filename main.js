let width = window.innerWidth;
let height = window.innerHeight;

let app = new PIXI.Application(width, height);
document.body.appendChild(app.view);

let shaderFrag = `
    precision mediump float;

    uniform vec3 iResolution;
    uniform float iTime;

    void main() {

        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = gl_FragCoord.xy/iResolution.xy;

        // Time varying pixel color
        vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

        // Output to screen
        gl_FragColor = vec4(col,1.0);

    }
`;

let container = new PIXI.Container();
container.filterArea = app.screen;
app.stage.addChild(container);

let filter = new PIXI.Filter(null, shaderFrag);
filter.uniforms.iResolution = [width, height, 1.0];
filter.uniforms.iTime = 1.0;
container.filters = [filter];

// Animate the filter
app.ticker.add(function(delta) {
    filter.uniforms.iTime += 0.1;
});