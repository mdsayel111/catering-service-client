const { zonePolygon } = require("@/data/address");

/**
 * Check if a point (lat, lng) is inside a zonePolygon
 * @param {number} lat - latitude of the point
 * @param {number} lng - longitude of the point
 * @param {Array<Array<number>>} zonePolygon - array of [lat, lng] pairs
 * @returns {boolean} true if inside, false if outside
 */
function isPointInZone(lat, lng) {
  let inside = false;
  for (let i = 0, j = zonePolygon.length - 1; i < zonePolygon.length; j = i++) {
    const xi = zonePolygon[i][1],
      yi = zonePolygon[i][0]; // lng, lat
    const xj = zonePolygon[j][1],
      yj = zonePolygon[j][0];
    const intersect =
      yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export { isPointInZone };
