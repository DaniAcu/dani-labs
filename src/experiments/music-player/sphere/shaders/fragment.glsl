#ifdef GL_ES
precision mediump float;
#endif

vec3 blue = vec3(0.149,0.141,0.912);

void main() {
    gl_FragColor = vec4(blue,1.0);
}