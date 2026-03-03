// SpriteMan.js

import { Manager } from "../Manager/Manager.js";
import { Sprite } from "../Sprite/Sprite.js";
import { ImageMan } from "../Image/ImageManager.js";

export class SpriteMan extends Manager {
  // ------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------
  constructor(reserveNum = 3, reserveGrow = 1) {
    super(); // base()

    this.baseInitialize(reserveNum, reserveGrow);
    this.poNodeCompare = new Sprite();
  }

  // ------------------------------------------------------------
  // Static Methods
  // ------------------------------------------------------------
  static Create(reserveNum = 3, reserveGrow = 1) {
    console.assert(reserveNum > 0);
    console.assert(reserveGrow > 0);
    console.assert(SpriteMan.pInstance === null);

    if (SpriteMan.pInstance === null) {
      SpriteMan.pInstance = new SpriteMan(reserveNum, reserveGrow);
    }
  }

  static Destroy() {
    const pMan = SpriteMan.privGetInstance();
    console.assert(pMan !== null);
    // intentionally empty (same as C#)
  }

  static Add(name, imageName, textureName, x, y, width, height) {
    const pMan = SpriteMan.privGetInstance();
    console.assert(pMan !== null);

    const pNode = pMan.baseAdd();
    console.assert(pNode !== null);

    const pImage = ImageMan.Find(imageName);
    console.assert(pImage !== null);

    pNode.Set(name, pImage, textureName, x, y, width, height);
    return pNode;
  }

  static Find(name) {
    const pMan = SpriteMan.privGetInstance();
    console.assert(pMan !== null);

    pMan.poNodeCompare.name = name;
    return pMan.baseFind(pMan.poNodeCompare);
  }

  static Remove(pNode) {
    const pMan = SpriteMan.privGetInstance();
    console.assert(pMan !== null);
    console.assert(pNode !== null);

    pMan.baseRemove(pNode);
  }

  static Dump() {
    const pMan = SpriteMan.privGetInstance();
    console.assert(pMan !== null);

    pMan.baseDump();
  }

  // ------------------------------------------------------------
  // Overrides
  // ------------------------------------------------------------
  derivedCreateNode() {
    const pNode = new Sprite();
    console.assert(pNode !== null);
    return pNode;
  }

  derivedCompare(pLinkA, pLinkB) {
    console.assert(pLinkA !== null);
    console.assert(pLinkB !== null);

    return pLinkA.name === pLinkB.name;
  }

  derivedWash(pLink) {
    console.assert(pLink !== null);
    pLink.Wash();
  }

  derivedDumpNode(pLink) {
    console.assert(pLink !== null);
    pLink.Dump();
  }

  // ------------------------------------------------------------
  // Private
  // ------------------------------------------------------------
  static privGetInstance() {
    console.assert(SpriteMan.pInstance !== null);
    return SpriteMan.pInstance;
  }

  // ------------------------------------------------------------
  // Data
  // ------------------------------------------------------------
  static pInstance = null;
}
