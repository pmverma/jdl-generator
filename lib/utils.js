function mergeMaps(map1, map2) {
    return new Map([...map1, ...map2]);
}

module.exports = {
    mergeMaps: mergeMaps
}