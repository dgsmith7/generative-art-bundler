# generative-art-bundler

Adapted from: https://github.com/Sean-Bradley/Three.js-TypeScript-Boilerplate

Artists, use baconRand.rand() in place of Math.random() in your sketches.

THREE.js and P5js are available dependecies.

Drop your sketch module in /src as index.js.

Type npm start in terminal.

Recover your bundle at /dist/main.js.

View it on localhost:8080. Each refresh should produce new deterministic randomness wherever baconRand.rand() was used.

Artists: Your unique token hash is the seed for deterministic randomness for you sketch. If you want to capture attributes for your token metadata to be displayed iaw OpenSea Metadata standards, here are some methods that will work.

Lowest hanging fruit:

Declare a global string called myString. For example:

let myString = '';

Each time you call baconRand, add some kind of label and value (based on the randomness) to your attributes object. Once all of the baconRand calls are over, set the hidden <div id="bacon-attributes">.innerHTML to the value of your object. The bundler and project manager will handle the rest. For example, I might say:

let r = baconRand.rand();
let g = baconRand.rand();
let b = baconRand.rand();
material0 = new MeshPhongMaterial({
color: new Color(r, g, b),
side: DoubleSide,
});

Then, I might use a string literal (back ticks, not single quotes) to easily convert this to a hexidecimal css string, accounting for single digit conversion results with padded zeros:

myString += `"background color": "#${parseInt(r * 255)
    .toString(16)
    .padStart(2, "0")}${parseInt(g * 255)
    .toString(16)
    .padStart(2, "0")}${parseInt(b * 255)
    .toString(16)
    .padStart(2, "0")}", `;

Repeat a similar process for each attribute, being sure to add a comma between attributes like so:

myString += ", ";

This would result in myString being set to a properly formatted string that appeared simlar to this:

"color": "#05d791", "background color": "#ac0bac"

Anything other than this format will be considered as "dog poo" to OpenSea, so pay close attention to punctuation. Then, assign this string to the necessary element as follows:

document.querySelector("#bacon-attributes").innerHTML = myString;

This will ensure that your token attributes will be transferred to the metadata. Of course this example is very dry, but if you understand how the randomness translates into your visual, you can really add any attributes you like, even plain english, but based on the randomness (maybe the r component is high so you say "reddish"). And you can write functions that perform this for you, based on your coding chops.

Higher, sweeter fruit:

Another, more directive approach: The variable tokenData is available to your script, and tokenData.tokenHash is the same 16 digit hexidecimal string that is used to seed the deterministic randomness. Try inserting these in your script to see it:

console.log(tokenData);
console.log(tokenData.tokenHash);

Or, assign the hash to something you can play with:

let myHash = tokenData.tokenHash;

As a friendly reminder, hexidecimal digits soan from 0-f like so: "0123456789abcdef". You can use that hash string to drive your attributes with way to easily assign plain english values and even drive rarity. For example if the first digit of the hash string is "e" then you can make the background red and assign the word "red" to the attribute. To drive rarity, you could make the background red if the first digit is between 0 and 7, blue if it is between 8 and d, and green if it is e or f. This would make green quite rare. (2/16, or 12.5% of the time). So you could do something like this:

let digit = myHash.charAt(0)
if ("ef".includes(digit)) {let bgColor = green;} else {let bgColor= red;}

Then you would also appropriately add to the attribute string as you assign these characteristics. Expand on these concepts with math and creativity, and the world is truly at you feet with assigning attributes.

In the end, you will still need to send a properly formatted (string as described above) to the page with this:

document.querySelector("#bacon-attributes").innerHTML = myString;
