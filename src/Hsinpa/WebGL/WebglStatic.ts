import { IntVector2 } from '../../Hsinpa/UniversalType';
import { VectorMinus } from '../../Hsinpa/UtilityMethod';


export function hsv2rgb(hue : number, saturate : number, value : number) {
    
    hue = radian2degree(hue);

    let f= (n : any, k=(n+hue/60)%6) => value - value*saturate*Math.max( Math.min(k,4-k,1), 0);     
    return [f(5),f(3),f(1), 1];       
  }
  
export function radian2degree(radian : number) {
    return radian * (180 / Math.PI);
}


//#region Collision Detection

export function SphereCollide(sphereX : number, sphereY : number, radian : number, collider_x : number, colider_y : number) : boolean {
    let posDiff = Math.sqrt(Math.pow(sphereX - collider_x, 2) + Math.pow(sphereY - colider_y, 2));

    return posDiff <= radian;
}


//Barycentric coordinates Algorithm
//https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
//Didn't fully get the algorithm yet
export function GetTriangleArea(p1 : IntVector2, p2 : IntVector2, p3 : IntVector2) {
    return 0.5 *(-p2.y * p3.x + p1.y * (-p2.x + p3.x) + p1.x * (p2.y - p3.y) + p2.x * p3.y);
}

export function TriangleCollide(point : IntVector2, v1 : IntVector2, v2 : IntVector2, v3 : IntVector2) {
    let area = GetTriangleArea(v1, v2, v3);

    let s = 1 / (2 * area) * (v1.y * v3.x - v1.x * v3.y + (v3.y - v1.y) * point.x + (v1.x - v3.x) * point.y);
    let t = 1 / (2 * area) * (v1.x * v2.y - v1.y * v2.x + (v1.y - v2.y) * point.x + (v2.x - v1.x) * point.y);

    return (s > 0) && (t > 0) && (1 - s - t > 0);
}
//#endregion