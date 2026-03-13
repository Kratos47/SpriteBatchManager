// Manager.js

export class Manager {
  // ------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------
  constructor() {
    this.mDeltaGrow = 0;
    this.mNumReserved = 0;
    this.mInitialNumReserved = 0;

    this.mNumActive = 0;
    this.mTotalNumNodes = 0;

    this.poActive = null;
    this.poReserve = null;
  }

  // ------------------------------------------------------------
  // BaseInitialize
  // ------------------------------------------------------------
  baseInitialize(initialNumReserved = 3, deltaGrow = 1) {
    console.assert(initialNumReserved >= 0);
    console.assert(deltaGrow > 0);

    this.mDeltaGrow = deltaGrow;
    this.mInitialNumReserved = initialNumReserved;

    this.privFillReservedPool(initialNumReserved);
  }

  // ------------------------------------------------------------
  // Base methods
  // ------------------------------------------------------------
  baseAdd() {
    if (this.poReserve === null) {
      this.privFillReservedPool(this.mDeltaGrow);
    }

    const pLink = Manager.privPullFromFront(this);
    console.assert(pLink !== null);

    this.derivedWash(pLink);

    this.mNumActive++;
    this.mNumReserved--;

    Manager.privAddToFront(this, "poActive", pLink);

    return pLink;
  }

  baseFind(pNodeTarget) {
    let pLink = this.poActive;

    while (pLink !== null) {
      if (this.derivedCompare(pLink, pNodeTarget)) {
        return pLink;
      }

      pLink = pLink.pNext;
    }

    return null;
  }

  baseRemove(pNode) {
    console.assert(pNode !== null);

    Manager.privRemoveNode(this, pNode);

    this.derivedWash(pNode);

    Manager.privAddToFront(this, "poReserve", pNode);

    this.mNumActive--;
    this.mNumReserved++;
  }

  baseDump() {
    console.log("");
    console.log("   ****** Manager Begin ****************");
    console.log("");

    console.log(`         mDeltaGrow: ${this.mDeltaGrow}`);
    console.log(`     mTotalNumNodes: ${this.mTotalNumNodes}`);
    console.log(`       mNumReserved: ${this.mNumReserved}`);
    console.log(`         mNumActive: ${this.mNumActive}`);
    console.log("");

    let pNode = this.poActive;

    console.log("   ------ Active List -----------");

    let i = 0;
    while (pNode !== null) {
      console.log(`   ${i}: -------------`);
      this.derivedDumpNode(pNode);
      i++;
      pNode = pNode.pNext;
    }

    console.log("");
    console.log("   ------ Reserve List ----------");

    pNode = this.poReserve;
    i = 0;

    while (pNode !== null) {
      console.log(`   ${i}: -------------`);
      this.derivedDumpNode(pNode);
      i++;
      pNode = pNode.pNext;
    }

    console.log("");
    console.log("   ****** Manager End ******************");
  }

  // ------------------------------------------------------------
  // Abstract methods
  // ------------------------------------------------------------
  derivedCreateNode() {
    throw new Error("derivedCreateNode() must be implemented");
  }

  derivedCompare(pLinkA, pLinkB) {
    throw new Error("derivedCompare() must be implemented");
  }

  derivedWash(pLink) {
    throw new Error("derivedWash() must be implemented");
  }

  derivedDumpNode(pLink) {
    throw new Error("derivedDumpNode() must be implemented");
  }

  // ------------------------------------------------------------
  // Private
  // ------------------------------------------------------------
  privFillReservedPool(count) {
    console.assert(count >= 1);

    this.mTotalNumNodes += count;
    this.mNumReserved += count;

    for (let i = 0; i < count; i++) {
      const pNode = this.derivedCreateNode();
      console.assert(pNode !== null);

      Manager.privAddToFront(this, "poReserve", pNode);
    }
  }

  // ------------------------------------------------------------
  // Static Helpers
  // ------------------------------------------------------------

  static privAddToFront(man, listName, pNode) {
    console.assert(pNode !== null);

    let pHead = man[listName];

    // ALWAYS reset pointers first (important bug fix)
    pNode.pNext = null;
    pNode.pPrev = null;

    if (pHead === null) {
      man[listName] = pNode;
    } else {
      pNode.pNext = pHead;
      pHead.pPrev = pNode;
      man[listName] = pNode;
    }
  }

  static privPullFromFront(man) {
    let pHead = man.poReserve;
    console.assert(pHead !== null);

    const pNode = pHead;

    man.poReserve = pHead.pNext;

    if (man.poReserve !== null) {
      man.poReserve.pPrev = null;
    }

    // reset node pointers
    pNode.pNext = null;
    pNode.pPrev = null;

    return pNode;
  }

  static privRemoveNode(man, pNode) {
    console.assert(man.poActive !== null);
    console.assert(pNode !== null);

    if (pNode.pPrev !== null) {
      pNode.pPrev.pNext = pNode.pNext;
    } else {
      man.poActive = pNode.pNext;
    }

    if (pNode.pNext !== null) {
      pNode.pNext.pPrev = pNode.pPrev;
    }

    pNode.pNext = null;
    pNode.pPrev = null;
  }
}