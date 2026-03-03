// Sprite.js

import { DLink } from "../Manager/DLink.js";
import { activeScene } from "../Globals.js";
/*
 * Assumptions:
 *  - Azul.Sprite
 *  - Azul.Rect
 *  - Color
 * are globally available (same as C# version)
 */

export class Sprite extends DLink {
  // ------------------------------------------------------------
  // Enum replacement
  // ------------------------------------------------------------
  static Name = Object.freeze({
    RedBird: "RedBird",
    YellowBird: "YellowBird",
    GreenBird: "GreenBird",
    WhiteBird: "WhiteBird",

    Alien_Crab: "Alien_Crab",
    Alien_Octopus: "Alien_Octopus",
    Alien_Squid: "Alien_Squid",
    Alien_UFO: "Alien_UFO",

    Stitch: "Stitch",

    RedGhost: "RedGhost",
    PinkGhost: "PinkGhost",
    BlueGhost: "BlueGhost",
    OrangeGhost: "OrangeGhost",
    MsPacMan: "MsPacMan",
    PowerUpGhost: "PowerUpGhost",
    Prezel: "Prezel",

    Uninitialized: "Uninitialized",
  });

  // ------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------
  constructor() {
    super(); // base()
    this.Clear();
  }

  // ------------------------------------------------------------
  // Methods
  // ------------------------------------------------------------
  Set(name, pImage ,textureName, x, y, width, height) {
    console.assert(pImage !== null);

    this.pImage = pImage;

    this.name = name;

    this.poSprite =  activeScene.add.sprite(x, y, textureName, pImage.name).setScale(width,height);

    console.assert(this.poSprite !== null);

    this.x = x;
    this.y = y;
    this.sx = width;
    this.sy = height;
    this.angle = this.poSprite.angle;
  }

  Clear() {
    this.pImage = null;
    this.name = Sprite.Name.Uninitialized;

    this.poSprite = null;

    this.x = 0.0;
    this.y = 0.0;
    this.sx = 1.0;
    this.sy = 1.0;
    this.angle = 0.0;
  }

  Wash() {
    this.Clear();
  }

  Dump() {
    console.log(`   Name: ${this.name} (${this})`);
    console.log(
      `             Image: ${this.pImage.name} (${this.pImage})`
    );
    console.log(`        PhaserSprite: (${this.poSprite})`);
    console.log(`             (x,y): ${this.x},${this.y}`);
    console.log(`           (sx,sy): ${this.sx},${this.sy}`);
    console.log(`           (angle): ${this.angle}`);

    if (this.pNext === null) {
      console.log("              next: null");
    } else {
      const pTmp = this.pNext;
      console.log(`              next: ${pTmp.name} (${pTmp})`);
    }

    if (this.pPrev === null) {
      console.log("              prev: null");
    } else {
      const pTmp = this.pPrev;
      console.log(`              prev: ${pTmp.name} (${pTmp})`);
    }
  }

  // ------------------------------------------------------------
  // Update / Render
  // ------------------------------------------------------------
  Update() {

    //console.log("===== Sprite Update =====");

    this.poSprite.x = this.x;
    this.poSprite.y = this.y;
    this.poSprite.scaleX = this.sx;
    this.poSprite.scaleY = this.sy;
    this.poSprite.angle = this.angle;

    this.poSprite.update();
  }

  Render() {
    // this.poAzulSprite.Render();
  }

  // ------------------------------------------------------------
  // Internal swaps
  // ------------------------------------------------------------
  SwapColor(color) {
    // 5. Apply to sprite
        this.poSprite.setTint(color);
  }

  SwapTextureRect(rect) {
    // this.poAzulSprite.SwapTextureRect(rect);
  }

  SwapScreenRect(rect) {
    // this.poAzulSprite.SwapTextureRect(rect);
  }

  // ------------------------------------------------------------
  // Static Data
  // ------------------------------------------------------------
  //static psTmpRect = new Azul.Rect();
}
