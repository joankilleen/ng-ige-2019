module.exports = {
    "env": {
        "browser": true,
        "jasmine": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off"
    }
    ,
    "globals": {
        "lesson": false,
        "learn": false,
        "FILL_ME_IN": false,
        "_": false
    }
};