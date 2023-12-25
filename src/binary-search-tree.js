const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.top = null;
  }

  root() {
    return this.top;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.top) {
      this.top = newNode;
      return;
    }

    let currentNode = this.top;

    while (true) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }

        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }

        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    let currentNode = this.top;

    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  find(data) {
    let currentNode = this.top;

    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);

        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) {
          node = node.right;

          return node;
        }
        if (!node.right) {
          node = node.left;

          return node;
        }
        let minFromRight = node.right;
        while (minFromRight.left) minFromRight = minFromRight.left;
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    };

    this.top = removeNode(this.top, data);
  }

  min() {
    let currentNode = this.top;
    while (currentNode && currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode ? currentNode.data : null;
  }

  max() {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }
}

module.exports = {
  BinarySearchTree
};