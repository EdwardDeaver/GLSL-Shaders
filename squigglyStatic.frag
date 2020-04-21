//equiTri function from Char Stiles 
//https://gist.github.com/CharStiles/e6fec016967c6c8fd648aa4b6c0055cc
float equiTri(vec2 p){
    float side = sqrt(3.0);
    p.x = abs(p.x) - 1.0;
    p.y = p.y +1.0/side;
    if(p.x + side*p.y > 0.0){
        p = vec2(p.x - side*p.y, -side*p.x - p.y)/2.0;
    }
    p.x -= clamp(p.x,-2.0,0.0);
    return -length(p)*sign(p.y);
    
}
// http://www.iquilezles.org/www/articles/palettes/palettes.htm
// As t runs from 0 to 1 (our normalized palette index or domain), 
//the cosine oscilates c times with a phase of d. 
//The result is scaled and biased by a and b to meet the desired constrast and brightness.
vec3 cosPalette( float t, vec3 a, vec3 b, vec3 c, vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}
// Repeat in two dimensions
vec2 pMod2(inout vec2 p, vec2 size) {
    vec2 c = floor((p + size*0.5)/size);
    p = mod(p + size*0.5,size) - size*0.5;
    return c;
}
// Rotate around a coordinate axis (i.e. in a plane perpendicular to that axis) by angle <a>.
// Read like this: R(p.xz, a) rotates "x towards z".
// This is fast if <a> is a compile-time constant and slower (but still practical) if not.
void pR(inout vec2 p, float a) {
    p = cos(a)*p + sin(a)*vec2(p.y, -p.x);
}
void main () {
    vec2 position = uv();
    position -= vec2(5);
    position *=vec2(10.);
        pMod2(position, vec2(time));

    //position is changine our camera position. triangle still written at 0,0
    position =(position + sin(time*2.*position.y *20.) * -.1);
    
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 0.5);
    vec3 d = vec3(0.80, 0.90, 0.30);
    
	float triangle = equiTri(position);
	    vec3 color = cosPalette(triangle, a,b,c,d);

	gl_FragColor = vec4(color,1.0);
}