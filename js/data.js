/* =========================================================
   INAIA — product content
   Edit this file to change names, text, specs and photos.
   Photos live in assets/products/ (transparent .webp).
   ========================================================= */

const IMG = 'assets/products/';
const LIFESTYLE = 'assets/lifestyle/';

/* Lifestyle photos for the left side of the collection pages.
   One is picked at random each time a collection opens.
   To fix a photo to one collection, add  lifestyle: 'file-name'  to it. */
const LIFESTYLE_PHOTOS = ['pastel-table', 'blue-jug', 'speckle-set'];

/* Intro header: three icons side by side (cups · plates · vases), one product in each.
   [collection key, photo index] */
const INTRO = {
  cup:   ['harlequin', 0],
  plate: ['indigo', 1],
  vase:  ['christmas-floral', 0]
};
const INTRO_TIME = 6000;   // ms before the home page opens (paused while hovering an icon)

const COLLECTIONS = [
  {
    key: 'grenadine', type: 'cup', name: 'Grenadine', size: 'Tea cup',
    tag: 'Pomegranates in a folk border',
    desc: 'Bands of red pomegranates, tulips and green leaves wrap a generous porcelain cup.',
    photos: ['grenadine-cup'],
    specs: [['Pieces', '2'], ['Material', 'Porcelain'], ['Finish', 'Gloss'], ['Color palette', 'Red, green']]
  },
  {
    key: 'harlequin', type: 'cup', name: 'Harlequin', size: 'Tea cup',
    tag: 'Hand-painted diamonds in every color',
    desc: 'A flared cup painted with bright harlequin diamonds, a coral rim and black brushstrokes inside.',
    photos: ['harlequin-cup'],
    specs: [['Pieces', '1'], ['Material', 'Stoneware'], ['Finish', 'Hand-painted'], ['Color palette', 'Multicolor']]
  },
  {
    key: 'carnation', type: 'cup', name: 'Carnation', size: 'Mug',
    tag: 'Rows of carnations between two bands',
    desc: 'Pink and red carnations stand in two rows between an amber rim and a turquoise line.',
    photos: ['carnation-mug'],
    specs: [['Pieces', '1'], ['Material', 'Porcelain'], ['Finish', 'Gloss'], ['Color palette', 'Pink, turquoise']]
  },
  {
    key: 'gold-vine', type: 'cup', name: 'Gold Vine', size: 'Tea cup',
    tag: 'Golden vines on a scalloped cup',
    desc: 'A footed, scalloped cup traced with fine gold vines and a gold rim and handle.',
    photos: ['gold-vine-cup'],
    specs: [['Pieces', '1'], ['Material', 'Bone china'], ['Finish', 'Gold'], ['Color palette', 'Ivory, gold']]
  },
  {
    key: 'pink-ikat', type: 'vase', name: 'Pink Ikat', size: 'Tall vase',
    tag: 'Watercolor ikat in rose and sky',
    desc: 'A tall waisted vase wrapped in a soft rose and sky-blue ikat print, banded in ochre.',
    photos: ['pink-ikat-vase'],
    specs: [['Pieces', '1'], ['Material', 'Porcelain'], ['Finish', 'Gloss'], ['Color palette', 'Rose, ochre']]
  },
  {
    key: 'horses', type: 'vase', name: 'Horses', size: 'Small vase',
    tag: 'Two horses in teal and gold',
    desc: 'A small cylinder vase with two stylised horses over a pattern of teal stripes and gold.',
    photos: ['horses-vase'],
    specs: [['Pieces', '1'], ['Material', 'Porcelain'], ['Finish', 'Gold details'], ['Color palette', 'Teal, gold']]
  },
  {
    key: 'christmas-floral', type: 'vase', name: 'Christmas Floral', size: 'Vase',
    tag: 'Garnet, gold and climbing vines',
    desc: 'Teal vines and red berries climb a scalloped cream ground between bands of garnet and gold.',
    photos: ['christmas-floral-vase'],
    specs: [['Pieces', '1'], ['Material', 'Porcelain'], ['Finish', 'Gold lustre'], ['Color palette', 'Garnet, teal']]
  },
  {
    key: 'pool', name: 'Pool', size: 'Dinner plate ⌀ 27 cm',
    tag: 'Soft aqua with a sunlit edge',
    desc: 'A hand-shaped rim and a glaze that pools lighter at the centre, finished with a speckled amber edge.',
    photos: ['pool'],
    specs: [['Pieces', '24'], ['Material', 'Porcelain'], ['Finish', 'Reactive glaze'], ['Color palette', 'Aqua']]
  },
  {
    key: 'miami', name: 'Miami', size: 'Dinner plate ⌀ 27 cm',
    tag: 'Blue toile, drawn branch by branch',
    desc: 'Birds, butterflies and blossoms engraved in deep teal on warm ivory, held by a fine gold rim.',
    photos: ['miami'],
    specs: [['Pieces', '24'], ['Material', 'Porcelain'], ['Finish', 'Gold rim'], ['Color palette', 'Teal, ivory']]
  },
  {
    key: 'indigo', name: 'Indigo Pearl', size: 'Deep plate ⌀ 22 cm',
    tag: 'Night blue strung with pearls',
    desc: 'Rings of cream pebbles spiral across a deep indigo glaze, from the rim down into the well.',
    photos: ['indigo-1', 'indigo-2'],
    specs: [['Pieces', '24'], ['Material', 'Stoneware'], ['Finish', 'Matte glaze'], ['Color palette', 'Indigo, cream']]
  },
  {
    key: 'watercolor-bird', name: 'Watercolor Bird', size: 'Dinner plate ⌀ 27 cm',
    tag: 'A small bird among coral leaves',
    desc: 'Watercolor leaves in coral and saffron frame a soft white plate, paired with a blush side plate.',
    photos: ['watercolor-bird-1', 'watercolor-bird-2'],
    specs: [['Pieces', '24'], ['Material', 'Porcelain'], ['Finish', 'Matte'], ['Color palette', 'Coral, rose']]
  },
  {
    key: 'twinkle', name: 'Twinkle', size: 'Dinner plate ⌀ 27 cm',
    tag: 'Mosaic mint, scattered with stars',
    desc: 'A border of tiny mint and sky tiles set with gold compass stars around a clean white centre.',
    photos: ['twinkle'],
    specs: [['Pieces', '21'], ['Material', 'Porcelain'], ['Finish', 'Gold lustre'], ['Color palette', 'Mint, gold']]
  },
  {
    key: 'breakfast', name: 'Breakfast', size: 'Dinner plate ⌀ 27 cm',
    tag: 'Every flower in bloom at once',
    desc: 'Bold cornflower, coral and turquoise blooms circle a white centre inside a stitched fuchsia rim.',
    photos: ['breakfast'],
    specs: [['Pieces', '13'], ['Material', 'Porcelain'], ['Finish', 'Gloss'], ['Color palette', 'Multicolor']]
  },
  {
    key: 'summer-party', name: 'Summer Party', size: 'Dinner plate ⌀ 26 cm',
    tag: 'Teal brushstrokes on speckled sand',
    desc: 'Loose rows of teal brushmarks over a speckled stoneware body, edged in rustic brown.',
    photos: ['summerparty'],
    specs: [['Pieces', '8'], ['Material', 'Stoneware'], ['Finish', 'Hand-brushed'], ['Color palette', 'Teal, sand']]
  },
  {
    key: 'solid', name: 'Solid', size: 'Dinner plate ⌀ 27 cm',
    tag: 'Warm clay, softly rippled',
    desc: 'A quiet taupe glaze over a gently rippled form. Made to sit under anything.',
    photos: ['solid'],
    specs: [['Pieces', '24'], ['Material', 'Porcelain'], ['Finish', 'Satin glaze'], ['Color palette', 'Taupe']]
  },
  {
    key: 'rosen', name: 'Rosen Baby Blue', size: 'Dinner plate ⌀ 26 cm',
    tag: 'Pale blue with a carved border',
    desc: 'Raised scrolls and leaves run around a scalloped rim in a single soft baby blue.',
    photos: ['rosen'],
    specs: [['Pieces', '24'], ['Material', 'Porcelain'], ['Finish', 'Embossed'], ['Color palette', 'Baby blue']]
  },
  {
    key: 'tally', name: 'Tally', size: 'Dinner plate ⌀ 27 cm',
    tag: 'Wildflowers in a red-stitched ring',
    desc: 'Thistle, yarrow and grey grasses drift around the edge, tied together by a fine red border.',
    photos: ['tally'],
    specs: [['Pieces', '26'], ['Material', 'Porcelain'], ['Finish', 'Gloss'], ['Color palette', 'Coral, sage']]
  },
  {
    key: 'la-palette', name: 'La Palette', size: 'Oval platter 34 cm',
    tag: 'Rose on rose, with a baroque edge',
    desc: 'A scalloped pink platter with embossed scrollwork and printed peonies in deep raspberry.',
    photos: ['lapalette'],
    specs: [['Pieces', '62'], ['Material', 'Porcelain'], ['Finish', 'Embossed'], ['Color palette', 'Pink']]
  },
  {
    key: 'berry', name: 'Berry Branch', size: 'Dinner plate ⌀ 27 cm',
    tag: 'Bamboo leaves and winter berries',
    desc: 'Fine branches of berries and bamboo leaves sweep across a pale grey band and gold rim.',
    photos: ['berry'],
    specs: [['Pieces', '24'], ['Material', 'Porcelain'], ['Finish', 'Gold rim'], ['Color palette', 'Grey, berry']]
  },
  {
    key: 'lattice', name: 'Golden Lattice', size: 'Dinner plate ⌀ 27 cm',
    tag: 'Gold dots on a mint lattice',
    desc: 'A woven lattice in pale mint, dotted in gold and bound by an engraved gold border.',
    photos: ['lattice'],
    specs: [['Pieces', '24'], ['Material', 'Porcelain'], ['Finish', 'Gold border'], ['Color palette', 'Mint, gold']]
  },
  {
    key: 'speckle', name: 'Sand Speckle', size: 'Dinner plate ⌀ 27 cm',
    tag: 'Cream glaze, flecked like sand',
    desc: 'A creamy glaze scattered with brown speckles and finished with a clean chocolate rim.',
    photos: ['speckle'],
    specs: [['Pieces', '24'], ['Material', 'Stoneware'], ['Finish', 'Speckled glaze'], ['Color palette', 'Cream, brown']]
  }
];

/* Plates on the home canvas.
   [collection key, x %, y %, size, depth, photo index]
   x / y are % of the canvas (the screen starts centred at 50 / 50).
   size is the plate width on a 1440px-wide screen. depth adds parallax (1 = none). */
const PLATES = [
  ['pool',            50.7, 57.5, 270, 1.00, 0],
  ['miami',           34.4, 33.0, 185,  .92, 0],
  ['indigo',          63.4, 41.5, 230, 1.06, 1],
  ['berry',           37.6, 52.0, 150,  .90, 0],
  ['tally',           66.8, 64.0, 155,  .95, 0],
  ['watercolor-bird', 30.2, 71.5, 205, 1.08, 0],
  ['watercolor-bird', 59.4, 77.5, 140,  .90, 1],
  ['breakfast',       79.0, 74.0, 330, 1.12, 0],
  ['twinkle',         79.0, 33.0, 235, 1.04, 0],
  ['summer-party',    21.5, 44.5, 200, 1.05, 0],
  ['solid',           12.0, 20.0, 190,  .94, 0],
  ['lattice',          9.0, 66.0, 220, 1.06, 0],
  ['rosen',           90.0, 54.0, 205,  .95, 0],
  ['indigo',          24.0, 90.0, 175,  .97, 0],
  ['la-palette',      45.0,  3.5, 240,  .93, 0],
  ['speckle',         60.0,  7.0, 170,  .96, 0],
  ['berry',           92.0, 13.0, 200, 1.02, 0],
  ['miami',           70.0, 91.0, 190, 1.05, 0],
  ['pool',             8.0, 42.0, 180, 1.00, 0],
  ['tally',           44.0, 91.0, 150,  .92, 0]
];
